from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.database.database import get_db
from app.auth.auth_bearer import verify_token

from app.models.resume import Resume
from app.models.job_match import JobMatch

from app.utils.pdf_reader import extract_text_from_pdf
from app.ai.gemini_service import analyze_job_match

router = APIRouter(tags=["Job Match"])


@router.post("/job-match/{resume_id}")
def job_match(
    resume_id: int,
    data: dict,
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user["id"]
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    resume_text = extract_text_from_pdf(resume.filepath)

    result = analyze_job_match(
        resume_text,
        data["job_description"]
    )

    job = JobMatch(
        resume_id=resume.id,
        job_description=data["job_description"],
        match_score=result["match_score"],
        matching_skills=json.dumps(result["matching_skills"]),
        missing_skills=json.dumps(result["missing_skills"]),
        suggestions=json.dumps(result["suggestions"])
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return result
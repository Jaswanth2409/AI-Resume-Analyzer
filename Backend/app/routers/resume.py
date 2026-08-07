from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.database.database import get_db
from app.auth.auth_bearer import verify_token
from app.models.resume import Resume
from app.utils.pdf_reader import extract_text_from_pdf
from app.ai.gemini_service import analyze_resume

import json
from app.models.analysis import Analysis

router = APIRouter(tags=["Resume"])

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(filepath)
    analysis = analyze_resume(resume_text)

    resume = Resume(
        filename=file.filename,
        filepath=filepath,
        user_id=user["id"]
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    analysis_data = Analysis(
    resume_id=resume.id,
    ats_score=analysis["ats_score"],
    technical_skills=json.dumps(analysis["technical_skills"]),
    soft_skills=json.dumps(analysis["soft_skills"]),
    strengths=json.dumps(analysis["strengths"]),
    weaknesses=json.dumps(analysis["weaknesses"]),
    missing_skills=json.dumps(analysis["missing_skills"]),
    suggestions=json.dumps(analysis["suggestions"]),
    overall_feedback=analysis["overall_feedback"]
)

    db.add(analysis_data)
    db.commit()
    db.refresh(analysis_data)

    return {
    "message": "Resume uploaded successfully",
    "resume_id": resume.id,
    "filename": file.filename
}
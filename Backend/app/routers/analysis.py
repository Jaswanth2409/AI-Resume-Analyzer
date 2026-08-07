from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.auth.auth_bearer import verify_token
from app.models.resume import Resume
from app.models.analysis import Analysis

router = APIRouter(tags=["Analysis"])


@router.get("/my-resumes")
def my_resumes(
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    resumes = (
        db.query(Resume, Analysis)
        .join(Analysis, Resume.id == Analysis.resume_id)
        .filter(Resume.user_id == user["id"])
        .all()
    )

    result = []

    for resume, analysis in resumes:
        result.append({
            "resume_id": resume.id,
            "filename": resume.filename,
            "ats_score": analysis.ats_score
        })

    return result

@router.get("/analysis/{resume_id}")
def get_analysis(
    resume_id: int,
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

    analysis = (
        db.query(Analysis)
        .filter(Analysis.resume_id == resume_id)
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return {
        "resume_id": resume.id,
        "filename": resume.filename,
        "ats_score": analysis.ats_score,
        "technical_skills": analysis.technical_skills,
        "soft_skills": analysis.soft_skills,
        "strengths": analysis.strengths,
        "weaknesses": analysis.weaknesses,
        "missing_skills": analysis.missing_skills,
        "suggestions": analysis.suggestions,
        "overall_feedback": analysis.overall_feedback
    }

@router.get("/stats")
def get_dashboard_stats(
    user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    total = (
        db.query(Resume)
        .filter(Resume.user_id == user["id"])
        .count()
    )

    average = (
        db.query(func.avg(Analysis.ats_score))
        .join(Resume)
        .filter(Resume.user_id == user["id"])
        .scalar()
    )

    highest = (
        db.query(func.max(Analysis.ats_score))
        .join(Resume)
        .filter(Resume.user_id == user["id"])
        .scalar()
    )

    latest = (
        db.query(Resume)
        .filter(Resume.user_id == user["id"])
        .order_by(Resume.id.desc())
        .first()
    )

    return {
        "total_resumes": total,
        "average_ats": round(average or 0),
        "highest_ats": highest or 0,
        "latest_resume": latest.filename if latest else None
    }
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

from app.database.database import get_db
from app.auth.auth_bearer import verify_token

from app.models.resume import Resume
from app.models.analysis import Analysis

from app.pdf.report_generator import generate_report

router = APIRouter(tags=["Report"])


@router.get("/download-report/{resume_id}")
def download_report(
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
        .filter(
            Analysis.resume_id == resume.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    os.makedirs("reports", exist_ok=True)

    output_path = f"reports/report_{resume.id}.pdf"

    generate_report(
        resume.filename,
        analysis,
        output_path
    )

    return FileResponse(
        output_path,
        media_type="application/pdf",
        filename=f"{resume.filename}_analysis.pdf"
    )
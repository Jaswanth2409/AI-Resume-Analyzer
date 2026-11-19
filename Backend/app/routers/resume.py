"""Upload a PDF and store its AI analysis as a single database transaction."""
import json
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.ai.gemini_service import AIServiceError, analyze_resume
from app.auth.auth_bearer import verify_token
from app.database.database import get_db
from app.models.analysis import Analysis
from app.models.resume import Resume
from app.utils.pdf_reader import extract_text_from_pdf

router = APIRouter(tags=["Resume"])
UPLOAD_FOLDER = Path(__file__).resolve().parents[1] / "uploads"
MAX_UPLOAD_BYTES = 10 * 1024 * 1024


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    user=Depends(verify_token),
    db: Session = Depends(get_db),
):
    filename = Path((file.filename or "").replace("\\", "/")).name
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF resume.")

    content = file.file.read(MAX_UPLOAD_BYTES + 1)
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="PDF must be 10 MB or smaller.")
    if not content.startswith(b"%PDF-"):
        raise HTTPException(status_code=400, detail="The file is not a valid PDF.")

    UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
    path = UPLOAD_FOLDER / (uuid.uuid4().hex + ".pdf")
    try:
        path.write_bytes(content)
        try:
            text = extract_text_from_pdf(str(path))
        except Exception as exc:
            raise HTTPException(status_code=400, detail="Unable to extract text from this PDF.") from exc
        if not text.strip():
            raise HTTPException(
                status_code=422,
                detail="No selectable text found. Scanned PDFs require OCR.",
            )
        try:
            result = analyze_resume(text)
        except AIServiceError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc

        resume = Resume(filename=filename, filepath=str(path), user_id=user["id"])
        db.add(resume)
        db.flush()

        analysis = Analysis(
            resume_id=resume.id,
            ats_score=result["ats_score"],
            technical_skills=json.dumps(result["technical_skills"]),
            soft_skills=json.dumps(result["soft_skills"]),
            strengths=json.dumps(result["strengths"]),
            weaknesses=json.dumps(result["weaknesses"]),
            missing_skills=json.dumps(result["missing_skills"]),
            suggestions=json.dumps(result["suggestions"]),
            overall_feedback=result["overall_feedback"],
        )
        db.add(analysis)
        db.commit()
        return {
            "message": "Resume analyzed successfully",
            "resume_id": resume.id,
            "filename": filename,
        }
    except Exception:
        db.rollback()
        path.unlink(missing_ok=True)
        raise
    finally:
        file.file.close()

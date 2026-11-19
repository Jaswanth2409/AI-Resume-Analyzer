from fastapi import FastAPI, Depends, HTTPException
from app.database.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis

from app.routers.auth import router as auth_router
from app.routers import analysis
from app.routers.resume import router as resume_router
from app.auth.auth_bearer import verify_token
from app.models.job_match import JobMatch
from app.routers.job_match import router as job_match_router
from app.routers.report import router as report_router
from app.ai.gemini_service import AIServiceError, analyze_resume

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-resume-analyzer-phi-flax.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(analysis.router)
app.include_router(job_match_router)
app.include_router(report_router)


@app.get("/")
def home():
    return {"message": "Welcome to AI Resume Analyzer API"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/profile")
def profile(user=Depends(verify_token)):
    return {"message": "Welcome", "user": user}


@app.get("/test-ai")
def test_ai(user=Depends(verify_token)):
    try:
        result = analyze_resume("Python Developer with FastAPI, SQL and JavaScript.")
    except AIServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return {"analysis": result}

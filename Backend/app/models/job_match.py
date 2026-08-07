from sqlalchemy import Column, Integer, Text, ForeignKey
from app.database.database import Base

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    job_description = Column(Text)

    match_score = Column(Integer)

    matching_skills = Column(Text)

    missing_skills = Column(Text)

    suggestions = Column(Text)
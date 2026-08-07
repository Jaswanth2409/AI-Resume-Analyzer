from sqlalchemy import Column, Integer, Text, ForeignKey
from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    ats_score = Column(Integer)

    technical_skills = Column(Text)
    soft_skills = Column(Text)

    strengths = Column(Text)
    weaknesses = Column(Text)

    missing_skills = Column(Text)

    suggestions = Column(Text)

    overall_feedback = Column(Text)
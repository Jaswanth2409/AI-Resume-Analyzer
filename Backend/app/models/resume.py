from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base
from app.utils.pdf_reader import extract_text_from_pdf

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
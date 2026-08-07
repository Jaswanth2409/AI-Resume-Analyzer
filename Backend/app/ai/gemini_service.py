import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


def analyze_resume(resume_text):

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Do not return markdown.
Do not return explanation.
Do not wrap the JSON inside ```json.

Return exactly this structure:

{{
    "ats_score": 0,
    "technical_skills": [],
    "soft_skills": [],
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": [],
    "overall_feedback": ""
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {
            "ats_score": 0,
            "technical_skills": [],
            "soft_skills": [],
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": [],
            "overall_feedback": "Unable to parse AI response."
        }
def analyze_job_match(resume_text, job_description):

    prompt = f"""
You are an ATS Resume Analyzer.

Compare the following Resume and Job Description.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON.

Format:

{{
    "match_score": 85,
    "matching_skills":[
        "Python",
        "SQL"
    ],
    "missing_skills":[
        "Docker",
        "AWS"
    ],
    "suggestions":[
        "Learn Docker",
        "Add AWS experience",
        "Mention REST APIs"
    ]
}}

Do not return markdown.
Do not return explanation.
Only JSON.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)
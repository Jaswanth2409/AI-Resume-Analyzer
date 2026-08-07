from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor

import json
import os


def generate_report(filename, analysis, output_path):

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    title_style.alignment = TA_CENTER
    title_style.textColor = HexColor("#0EA5E9")

    heading = styles["Heading2"]
    heading.textColor = HexColor("#2563EB")

    normal = styles["BodyText"]

    doc = SimpleDocTemplate(output_path)

    story = []

    story.append(Paragraph("AI Resume Analysis Report", title_style))
    story.append(Spacer(1, 20))

    story.append(Paragraph(f"<b>Resume:</b> {filename}", normal))
    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {analysis.ats_score}/100",
            heading,
        )
    )

    story.append(Spacer(1, 20))


    def add_section(title, value):

        story.append(Paragraph(title, heading))
        story.append(Spacer(1, 8))

        if isinstance(value, str):
            try:
                value = json.loads(value)
            except:
                pass

        if isinstance(value, list):

            items = [
                ListItem(Paragraph(str(v), normal))
                for v in value
            ]

            story.append(ListFlowable(items))

        else:

            story.append(
                Paragraph(str(value), normal)
            )

        story.append(Spacer(1, 18))


    add_section("Technical Skills", analysis.technical_skills)

    add_section("Soft Skills", analysis.soft_skills)

    add_section("Strengths", analysis.strengths)

    add_section("Weaknesses", analysis.weaknesses)

    add_section("Missing Skills", analysis.missing_skills)

    add_section("Suggestions", analysis.suggestions)

    add_section("Overall Feedback", analysis.overall_feedback)

    doc.build(story)

    return output_path
# AI Resume Analyzer

An AI-powered web application that analyzes resumes, evaluates ATS-related criteria, identifies skills, and provides personalized feedback to help users improve their resumes and assess their fit for specific job descriptions.

## Features

- **User Authentication:** Register and log in using JWT-based authentication.
- **Resume Upload:** Upload PDF resumes for automated analysis.
- **AI-Powered Resume Analysis:** Uses Google Gemini to evaluate resume content and generate structured feedback.
- **ATS Score:** Generates an ATS-related score out of 100.
- **Skill Extraction:** Identifies technical and soft skills.
- **Resume Feedback:** Highlights strengths, weaknesses, missing skills, and improvement suggestions.
- **Job Description Matching:** Compares an uploaded resume with a job description and returns a match score, matching skills, missing skills, and recommendations.
- **Resume History:** View previously uploaded and analyzed resumes.
- **Dashboard Statistics:** Displays total resumes, average ATS score, highest ATS score, and latest resume.
- **PDF Report Generation:** Generate and download a PDF containing the resume analysis results.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Framer Motion
- Lucide React

### Backend
- Python
- FastAPI
- SQLAlchemy
- Uvicorn
- Pydantic

### AI Integration
- Google Gemini API (`gemini-flash-latest`)

### Database and Storage
- PostgreSQL (through SQLAlchemy and `DATABASE_URL`)
- Local PDF file storage

### Authentication and Security
- JWT authentication
- Passlib
- Bcrypt

### PDF Processing
- PyPDF
- PDFPlumber
- ReportLab

## Project Structure

```text
AI-Resume-Analyzer/
│
├── Backend/
│   ├── app/
│   │   ├── ai/
│   │   │   └── gemini_service.py
│   │   ├── auth/
│   │   │   ├── auth_bearer.py
│   │   │   └── jwt_handler.py
│   │   ├── database/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── analysis.py
│   │   │   ├── job_match.py
│   │   │   ├── resume.py
│   │   │   └── user.py
│   │   ├── pdf/
│   │   │   └── report_generator.py
│   │   ├── routers/
│   │   │   ├── analysis.py
│   │   │   ├── auth.py
│   │   │   ├── job_match.py
│   │   │   ├── report.py
│   │   │   └── resume.py
│   │   ├── schemas/
│   │   ├── uploads/
│   │   ├── utils/
│   │   │   └── pdf_reader.py
│   │   └── main.py
│   ├── reports/
│   └── requirements.txt
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## How It Works

1. A user registers or logs in to the application.
2. The user uploads a resume in PDF format.
3. The FastAPI backend extracts text from the PDF.
4. The extracted resume content is sent to Google Gemini for analysis.
5. The AI returns structured results, including an ATS score, skills, strengths, weaknesses, missing skills, and suggestions.
6. The analysis is stored in the database and displayed on the dashboard.
7. The user can provide a job description to receive a resume–job match analysis.
8. The user can view previous analyses and download a PDF report.

## Installation and Setup

### Prerequisites

- Python 3.10+
- Node.js and npm
- PostgreSQL database
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Jaswanth2409/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Create and activate a virtual environment:

**Windows**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `Backend` directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/resume_analyzer
GEMINI_API_KEY=your_gemini_api_key
```

Replace the database credentials and API key with your own values.

Start the backend:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate a user |
| GET | `/profile` | Retrieve authenticated user information |
| POST | `/upload` | Upload and analyze a PDF resume |
| GET | `/my-resumes` | Retrieve the user's analyzed resumes |
| GET | `/analysis/{resume_id}` | Retrieve a specific resume analysis |
| GET | `/stats` | Retrieve dashboard statistics |
| POST | `/job-match/{resume_id}` | Compare a resume with a job description |
| GET | `/download-report/{resume_id}` | Generate and download an analysis report |

Most resume, analysis, job-matching, and report endpoints require a Bearer JWT access token.

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL database connection string |
| `GEMINI_API_KEY` | Google Gemini API key |

Keep API keys and database credentials private. Do not commit your `.env` file to GitHub.

## Future Improvements

- Support for additional resume formats such as DOCX.
- More detailed resume formatting and ATS compatibility checks.
- Improved resume analytics and visualizations.
- More advanced job recommendations.
- Enhanced validation and error handling.
- Automated backend and frontend testing.

## Disclaimer

The ATS score and AI-generated recommendations are automated assessments intended to help improve resume quality. They do not guarantee selection by an employer or an actual score from any company's applicant tracking system.

## Author

**Jaswanth**

GitHub: [Jaswanth2409](https://github.com/Jaswanth2409)

Project Repository: [AI Resume Analyzer](https://github.com/Jaswanth2409/AI-Resume-Analyzer)

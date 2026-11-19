# ATS analysis deployment checklist

This PR addresses a real bug in the original Gemini integration: invalid model
JSON was stored as an artificial ATS score of 0, and API errors were displayed
as a generic browser alert.

## Deploy safely

1. Review and merge this PR. The Vercel/Render services must be connected to
   the repository's merged branch for automatic deployment.
2. On **Render**, configure these private environment variables:
   - GEMINI_API_KEY: your Gemini Developer API key
   - GEMINI_MODEL: gemini-3.8-flash (only if supported by your key/project)
   - DATABASE_URL: **retain your existing production database**
3. On **Render** the service root directory is Backend, build command
   is pip install -r requirements.txt, and start command is
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
4. Check https://ai-resume-analyzer-h25j.onrender.com/health after deploying.
   It should return {"status":"ok"}.
5. On **Vercel**, set VITE_API_BASE_URL to
   https://ai-resume-analyzer-h25j.onrender.com (Production); if you change
   the variable, redeploy so Vite can rebuild the frontend.
6. Login and upload a text-based PDF (<10 MB). A failed Gemini call now
   returns HTTP 502 with a helpful explanation instead of a fake score.

## Diagnosing a failed upload

Use Chrome DevTools > Network > POST /upload, inspect the HTTP status and
response detail, then match it to the Render service log line. HTTP 429 from
Gemini usually means quota or rate limiting; 404 means model availability;
401/403 indicates API-key permissions, 402 billing credits, and 503 transient
service errors. Error diagnostics never log the resume text or API key.

**Do not commit .env files or API secrets.** The existing public repository
also contains uploaded resumes and generated reports. Remove those files from
the repository and consider their previous public exposure separately.

Use python -m pytest -q Backend/tests after installing Backend/requirements-dev.txt
from the Backend directory.

Previous ATS scores of zero that were written by the old fallback remain in
the database. Re-upload a resume to get a fresh analysis; old zero scores
cannot reliably be distinguished from legitimate scores of zero.

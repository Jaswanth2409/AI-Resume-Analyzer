"""Unit tests that never contact Gemini or require an API key."""
import json
from types import SimpleNamespace

import pytest

from app.ai import gemini_service as service


def _response(data):
    return SimpleNamespace(text=json.dumps(data))


def _valid_resume():
    return {
        "ats_score": 84,
        "technical_skills": ["Python"],
        "soft_skills": [],
        "strengths": [],
        "weaknesses": [],
        "missing_skills": [],
        "suggestions": ["Add results"],
        "overall_feedback": "Good foundation",
    }


def test_valid_resume(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "unit-test-not-a-real-key")
    monkeypatch.setattr(service.genai, "Client", lambda api_key: SimpleNamespace(
        models=SimpleNamespace(generate_content=lambda **kwargs: _response(_valid_resume()))
    ))
    assert service.analyze_resume("Python developer")["ats_score"] == 84


def test_invalid_json_does_not_create_zero_score(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "unit-test-not-a-real-key")
    monkeypatch.setattr(service.genai, "Client", lambda api_key: SimpleNamespace(
        models=SimpleNamespace(generate_content=lambda **kwargs: SimpleNamespace(text="{not-json"))
    ))
    with pytest.raises(service.AIServiceError, match="invalid JSON"):
        service.analyze_resume("Python developer")


def test_quota_error(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "unit-test-not-a-real-key")

    class QuotaError(Exception):
        code = 429

    def fail(**kwargs):
        raise QuotaError()

    monkeypatch.setattr(service.genai, "Client", lambda api_key: SimpleNamespace(
        models=SimpleNamespace(generate_content=fail)
    ))
    with pytest.raises(service.AIServiceError, match="quota"):
        service.analyze_resume("Python developer")


def test_retries_transient_503_then_succeeds(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "unit-test-not-a-real-key")
    monkeypatch.setattr(service.time, "sleep", lambda seconds: None)
    calls = []

    class ServerError(Exception):
        code = 503

    def generate(**kwargs):
        calls.append(kwargs)
        if len(calls) < 3:
            raise ServerError()
        return _response(_valid_resume())

    monkeypatch.setattr(service.genai, "Client", lambda api_key: SimpleNamespace(
        models=SimpleNamespace(generate_content=generate)
    ))
    assert service.analyze_resume("Python developer")["ats_score"] == 84
    assert len(calls) == 3


def test_does_not_retry_missing_model_404(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "unit-test-not-a-real-key")
    calls = []

    class MissingModel(Exception):
        code = 404

    def generate(**kwargs):
        calls.append(kwargs)
        raise MissingModel()

    monkeypatch.setattr(service.genai, "Client", lambda api_key: SimpleNamespace(
        models=SimpleNamespace(generate_content=generate)
    ))
    with pytest.raises(service.AIServiceError, match="model not available"):
        service.analyze_resume("Python developer")
    assert len(calls) == 1

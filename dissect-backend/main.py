"""
FastAPI application for Dissect - Multi-agent adversarial idea critique tool.
"""
import json
import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from graph import run_dissect_pipeline
from utils import extract_text_from_file


load_dotenv()


app = FastAPI(
    title="Dissect API",
    description="Multi-agent adversarial idea critique tool",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IdeaRequest(BaseModel):
    """Request body for idea analysis."""
    idea: str


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "dissect-api"}


async def generate_sse_events(idea: str):
    """Generate SSE events from the dissect pipeline."""
    try:
        async for event in run_dissect_pipeline(idea):
            data = {
                "agent": event.agent,
                "chunk": event.chunk,
                "is_done": event.is_done,
                "is_error": getattr(event, "is_error", False),
            }
            yield f"data: {json.dumps(data)}\n\n"
    except Exception as e:
        error_data = {
            "agent": "error",
            "chunk": str(e),
            "is_done": True,
            "is_error": True,
        }
        yield f"data: {json.dumps(error_data)}\n\n"


@app.post("/analyze")
async def analyze_idea(
    idea: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    """
    Analyze an idea using adversarial agents.

    Accepts either:
    - JSON body with 'idea' field
    - Multipart form with 'idea' text field and optional 'file' upload
    """
    combined_idea = ""

    if file:
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file_bytes, file.filename)
        if extracted_text:
            combined_idea += f"[Document Content from {file.filename}]:\n{extracted_text}\n\n"
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.filename}. Only PDF and DOCX are supported."
            )

    if idea:
        combined_idea += idea

    if not combined_idea.strip():
        raise HTTPException(
            status_code=400,
            detail="No idea provided. Please enter text or upload a document."
        )

    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY not configured on server."
        )

    return StreamingResponse(
        generate_sse_events(combined_idea),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.post("/analyze-json")
async def analyze_idea_json(request: IdeaRequest):
    """
    Analyze an idea using adversarial agents (JSON body version).
    """
    if not request.idea.strip():
        raise HTTPException(
            status_code=400,
            detail="No idea provided."
        )

    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY not configured on server."
        )

    return StreamingResponse(
        generate_sse_events(request.idea),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

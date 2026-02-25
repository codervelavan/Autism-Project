from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os
import logging
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatInput(BaseModel):
    message: str
    history: list = []

# OpenRouter Configuration
OPENROUTER_API_KEY = "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"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

SYSTEM_PROMPT = """
You are 'NeuroAssistant', a compassionate and highly knowledgeable clinical AI specialized in Autism Spectrum Disorder (ASD). 
Your goal is to help parents clear their doubts, provide emotional support, and explain technical terms simply.
Always encourage parents to seek professional medical advice and clarify that this AI tool is for screening and support only, not a formal diagnosis.
Be empathetic, patient, and use evidence-based information.
If asked about treatments, mention specialized therapies like ABA, Speech Therapy, or Occupational Therapy, but always advise consulting a developmental pediatrician.
Keep responses concise but supportive.
"""

@router.post("/ask")
async def ask_assistant(input: ChatInput):
    try:
        # Prepare history for OpenRouter (OpenAI format)
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        for h in input.history:
            role = "user" if h.get("role") == "user" else "assistant"
            messages.append({"role": role, "content": h.get("content", "")})
            
        messages.append({"role": "user", "content": input.message})

        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "NeuroWeave AI",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "google/gemini-pro-1.5", # Optimized model selection
                    "messages": messages,
                    "temperature": 0.5, # Lower temperature for clinical context
                    "top_p": 0.9,
                },
                timeout=45.0
            )

            res_json = response.json()
            if response.status_code != 200:
                error_msg = res_json.get('error', {}).get('message', 'Unknown AI error')
                logger.error(f"OpenRouter Error: {error_msg}")
                return {"response": f"I encountered a clinical processing error: {error_msg[:100]}..."}

            reply = res_json['choices'][0]['message']['content']
            return {"response": reply}

    except Exception as e:
        logger.error(f"Chat Endpoint Error: {str(e)}")
        # Fallback if httpx is not installed or other errors
        try:
            import requests
            headers = {
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "NeuroWeave AI"
            }
            body = {
                "model": "google/gemini-flash-1.5",
                "messages": messages
            }
            res = requests.post(OPENROUTER_URL, headers=headers, json=body)
            return {"response": res.json()['choices'][0]['message']['content']}
        except:
            raise HTTPException(status_code=500, detail="Neural processing error")

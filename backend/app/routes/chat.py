from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatInput(BaseModel):
    message: str
    history: list = []

SYSTEM_PROMPT = """
You are 'NeuroAssistant', a compassionate and highly knowledgeable AI specialized in Autism Spectrum Disorder (ASD). 
Your goal is to help parents clear their doubts, provide emotional support, and explain technical terms simply.
Always encourage parents to seek professional medical advice and clarify that this AI tool is for screening and support only, not a formal diagnosis.
Be empathetic, patient, and use evidence-based information.
"""

@router.post("/ask")
async def ask_assistant(input: ChatInput):
    try:
        # Check if API key is configured
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
             logger.warning("GOOGLE_API_KEY not found in environment variables.")
             return {"response": "I'm currently in safe mode. To enable my full AI capabilities, please add your GOOGLE_API_KEY to the environment. For now, remember that early intervention is the most powerful tool for your child's growth!"}

        genai.configure(api_key=api_key)
        
        # Use a more robust model selection
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            # Formulate the full context
            context_history = []
            context_history.append({"role": "user", "parts": [SYSTEM_PROMPT]})
            context_history.append({"role": "model", "parts": ["I understand my role as NeuroAssistant. I will provide empathetic, evidence-based support to parents regarding autism concerns, always emphasizing the need for professional consultation."] })
            
            # Map input history (if provided by frontend)
            for h in input.history:
                role = "user" if h.get("role") == "user" else "model"
                context_history.append({"role": role, "parts": [h.get("content", "")]})

            chat = model.start_chat(history=context_history)
            response = chat.send_message(input.message)
            
            if not response or not response.text:
                raise ValueError("Empty response from AI model")
                
            return {"response": response.text}
            
        except Exception as e:
            logger.error(f"Gemini API Error: {str(e)}")
            return {"response": "I encountered a technical glitch while thinking. Please try asking again, or check your internet connection."}

    except Exception as e:
        logger.error(f"General Chat Endpoint Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error in chat processing")

from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from app.models.autism_model import predict_tabular_risk
from app.utils.shap_utils import get_shap_values
from app.models.fusion_model import fuse_predictions
from app.agents.therapy_agent import generate_therapy_plan
from app.database import SessionLocal
from app.models.db_models import ScreeningSession
from app.models.image_inference import predict_image
from PIL import Image

import shutil
import os
import cv2
import numpy as np

router = APIRouter(prefix="/screening", tags=["Screening"])


# ----------------------------
# INPUT SCHEMA
# ----------------------------
class ScreeningInput(BaseModel):
    A1: int
    A2: int
    A3: int
    A4: int
    A5: int
    A6: int
    A7: int
    A8: int
    A9: int
    A10: int
    Age_Mons: int
    Qchat_10_Score: int
    Jaundice: int
    Family_mem_with_ASD: int


# ----------------------------
# TABULAR ONLY ENDPOINT
# ----------------------------
@router.post("/predict")
def predict(input: ScreeningInput):

    data = input.dict()

    risk, confidence = predict_tabular_risk(data)
    explanation = get_shap_values(data)

    if risk < 0.4:
        category = "Low Risk"
    elif risk < 0.7:
        category = "Moderate Risk"
    else:
        category = "High Risk"

    return {
        "risk_score": risk,
        "confidence": confidence,
        "risk_category": category,
        "explanation": explanation
    }


# ----------------------------
# VIDEO ONLY ENDPOINT (CNN)
# ----------------------------
@router.post("/video")
def video_analysis(file: UploadFile = File(...)):

    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cap = cv2.VideoCapture(file_location)

    frame_probs = []
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # Sample every 10th frame
        if frame_count % 10 != 0:
            continue

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb)

        prob = predict_image(pil_image)
        frame_probs.append(prob)

    cap.release()
    os.remove(file_location)

    if len(frame_probs) == 0:
        return {"error": "Could not process video"}

    video_risk = float(np.mean(frame_probs))

    return {
        "video_risk": video_risk
    }


# ----------------------------
# MULTIMODAL ENDPOINT (Adaptive Fusion)
# ----------------------------
@router.post("/multimodal")
def multimodal_predict(
    file: UploadFile = File(...),
    A1: int = Form(0),
    A2: int = Form(0),
    A3: int = Form(0),
    A4: int = Form(0),
    A5: int = Form(0),
    A6: int = Form(0),
    A7: int = Form(0),
    A8: int = Form(0),
    A9: int = Form(0),
    A10: int = Form(0),
    Age_Mons: int = Form(24),
    Qchat_10_Score: int = Form(0),
    Jaundice: int = Form(0),
    Family_mem_with_ASD: int = Form(0)
):

    data = {
        "A1": A1, "A2": A2, "A3": A3, "A4": A4, "A5": A5,
        "A6": A6, "A7": A7, "A8": A8, "A9": A9, "A10": A10,
        "Age_Mons": Age_Mons, "Qchat_10_Score": Qchat_10_Score,
        "Jaundice": Jaundice, "Family_mem_with_ASD": Family_mem_with_ASD
    }

    # 1️⃣ Tabular Prediction
    tabular_risk, confidence = predict_tabular_risk(data)

    # 2️⃣ Save Video
    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cap = cv2.VideoCapture(file_location)

    frame_probs = []
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        if frame_count % 10 != 0:
            continue

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb)

        prob = predict_image(pil_image)
        frame_probs.append(prob)

    cap.release()
    os.remove(file_location)

    if len(frame_probs) == 0:
        return {"error": "Could not process video"}

    video_risk = float(np.mean(frame_probs))

    # 3️⃣ Adaptive Fusion
    final_risk = fuse_predictions(tabular_risk, video_risk)

    if final_risk < 0.4:
        category = "Low Risk"
    elif final_risk < 0.7:
        category = "Moderate Risk"
    else:
        category = "High Risk"

    # Risk Breakdown for Explainability
    risk_breakdown = {
        "tabular_contribution_%": round(tabular_risk * 100, 2),
        "video_contribution_%": round(video_risk * 100, 2),
        "final_risk_%": round(final_risk * 100, 2)
    }

    # 4️⃣ Therapy Agent
    therapy_plan = generate_therapy_plan(
        data,
        final_risk,
        video_risk
    )

    # 5️⃣ Save to Database
    db = SessionLocal()

    session = ScreeningSession(
        final_risk=final_risk,
        confidence=confidence,
        risk_category=category,
        engagement_score=video_risk,
        intervention_intensity=therapy_plan["intervention_intensity"]
    )

    db.add(session)
    db.commit()
    db.close()

    return {
        "tabular_risk": tabular_risk,
        "video_risk": video_risk,
        "final_risk": final_risk,
        "confidence": confidence,
        "risk_category": category,
        "risk_breakdown": risk_breakdown,
        "therapy_plan": therapy_plan
    }


@router.post("/gamified")
def gamified_predict(
    file: UploadFile = File(...),
    engagement_score: float = Form(...)
):
    # This endpoint treats 'engagement_score' as the tabular component
    # normalization: assuming score 0-100, normalize to 0-1
    normalized_score = engagement_score / 100.0 if engagement_score > 1 else engagement_score
    
    # Standard tabular prediction with average defaults
    default_data = {
        "A1": 0, "A2": 0, "A3": 0, "A4": 0, "A5": 0,
        "A6": 0, "A7": 0, "A8": 0, "A9": 0, "A10": 0,
        "Age_Mons": 24, "Qchat_10_Score": 0,
        "Jaundice": 0, "Family_mem_with_ASD": 0
    }
    
    # Video Analysis
    file_location = f"temp_game_{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    cap = cv2.VideoCapture(file_location)
    frame_probs = []
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        
        frame_count += 1
        # Sample every 15th frame for games (faster)
        if frame_count % 15 != 0:
            continue
            
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        prob = predict_image(Image.fromarray(rgb))
        frame_probs.append(prob)
    cap.release()
    os.remove(file_location)
    
    video_risk = float(np.mean(frame_probs)) if frame_probs else 0.5
    
    # Fusion (weighted towards game engagement and video analysis)
    final_risk = fuse_predictions(normalized_score, video_risk)
    
    if final_risk < 0.4: category = "Low Risk"
    elif final_risk < 0.7: category = "Moderate Risk"
    else: category = "High Risk"
    
    # Save session
    db = SessionLocal()
    session = ScreeningSession(
        final_risk=final_risk,
        confidence=0.85,
        risk_category=category,
        engagement_score=normalized_score,
        intervention_intensity="Routine developmental play"
    )
    db.add(session)
    db.commit()
    db.close()
    
    return {
        "final_risk": final_risk,
        "risk_category": category,
        "video_risk": video_risk,
        "game_engagement": normalized_score
    }


# ----------------------------
# HISTORY ENDPOINT (Monitoring)
# ----------------------------
@router.get("/history")
def get_history():

    db = SessionLocal()
    sessions = db.query(ScreeningSession).all()
    db.close()

    return [
        {
            "id": s.id,
            "final_risk": s.final_risk,
            "risk_category": s.risk_category
        }
        for s in sessions
    ]

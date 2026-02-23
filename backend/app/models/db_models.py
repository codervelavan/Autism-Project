from sqlalchemy import Column, Integer, Float, String
from app.database import Base

class ScreeningSession(Base):
    __tablename__ = "screening_sessions"

    id = Column(Integer, primary_key=True, index=True)
    final_risk = Column(Float)
    confidence = Column(Float)
    risk_category = Column(String)
    engagement_score = Column(Float)
    intervention_intensity = Column(String)

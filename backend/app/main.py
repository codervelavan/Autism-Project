from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import screening, chat
from app.database import engine
from app.models import db_models

db_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="NeuroWeave AI")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(screening.router)
app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "NeuroWeave AI Backend Running"}

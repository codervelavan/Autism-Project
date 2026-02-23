from fastapi import FastAPI
from app.routes import screening
from app.database import engine
from app.models import db_models

db_models.Base.metadata.create_all(bind=engine)


app = FastAPI(title="NeuroWeave AI")

app.include_router(screening.router)

@app.get("/")
def root():
    return {"message": "NeuroWeave AI Backend Running"}

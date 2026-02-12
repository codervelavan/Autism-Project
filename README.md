🧠 AI-Enabled End-to-End Autism Care Platform
Tata Elxsi Grand Hackathon Submission
🚀 Overview

This project is an AI-powered MVP platform designed to address systemic gaps in autism care including:

Delayed early screening

Subjective diagnosis

Fragmented therapy planning

Lack of longitudinal monitoring

Our solution integrates AI-based behavioral screening, personalized therapy planning, and progress monitoring into a unified, scalable system.

🎯 MVP Features
1️⃣ AI-Based Early Screening

Video-based behavioral analysis

Eye contact & engagement detection using MediaPipe

Risk scoring (Low / Moderate / High)

Explainable output metrics

2️⃣ AI Personalized Therapy Planning

Child-specific structured input

LLM-powered therapy plan generation

Weekly measurable milestones

Clinician-assisted recommendations

3️⃣ Continuous Progress Monitoring

Weekly progress logging

Visual improvement tracking

Plateau detection alerts

Data-driven therapy adjustment suggestions

🏗 System Architecture
Frontend (React)
        ↓
Backend API (FastAPI)
        ↓
AI Layer
   ├── Computer Vision (MediaPipe + OpenCV)
   ├── Risk Scoring Model (Sklearn)
   └── LLM Therapy Generator
        ↓
Database (Supabase / Firebase / MongoDB)

📂 Project Structure
autism-mvp/
│
├── ai/
│   ├── screening.py
│   ├── therapy_generator.py
│
├── backend/
│   ├── main.py
│   ├── models.py
│
├── frontend/
│   ├── src/
│
└── README.md

🛠 Tech Stack
AI / ML

Python

MediaPipe

OpenCV

Scikit-learn

LLM API

Backend

FastAPI

REST APIs

Supabase / MongoDB

Frontend

React

TailwindCSS

Chart.js / Recharts

🔒 Ethical & Privacy Considerations

Privacy-first architecture

No permanent video storage (MVP mode)

Parental consent requirement

AI decision-support (not autonomous diagnosis)

📊 Demo Flow

Upload child video

Receive AI-based risk score

Generate personalized therapy plan

Track progress via dashboard

👥 Team Members

AI / ML Engineer – Screening & Therapy Intelligence

Backend Engineer – API & Data Flow

Frontend Engineer – UI & Visualization

🌍 Scalability Vision

Home + clinic deployment

Low-resource region support

Multi-language support

Future integration with EEG & multimodal biomarkers

🏆 Why This Matters

Autism affects millions of children globally, yet early diagnosis and continuous care remain inconsistent.

This platform aims to enable:

Faster screening

Personalized interventions

Data-driven therapy optimization

📌 Future Roadmap

Multimodal biomarker integration

Reinforcement-learning-based therapy optimization

Nationwide screening program deployment

Government & hospital partnerships

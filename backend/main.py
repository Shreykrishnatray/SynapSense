from fastapi import FastAPI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env
load_dotenv()

# Import routes
from app.routes.plan_routes import router as plan_router

# Initialize FastAPI app
app = FastAPI(
    title="SynapSense - Thought To Action",
    description="Backend API for AI-driven task planning and visualization",
    version="1.0.0"
)

# Enable CORS (allow frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust for security in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(plan_router)

# Root endpoint
@app.get("/")
def root():
    return {"message": "SynapSense backend is running 🚀"}







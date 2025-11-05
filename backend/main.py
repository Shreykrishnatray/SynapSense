from fastapi import FastAPI
from dotenv import load_dotenv 
import os

load_dotenv()  #this will load my .env file

from app.routes.plan_routes import router as plan_router

app = FastAPI()
app.include_router(plan_router)

from fastapi.middleware.cors import CORSMiddleware
from app.routes import plan_routes

app = FastAPI(
    title="SynapSense - Thought To Action",
    description="Backend API for AI-driven task planning and visualization",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # to adjust afterwards for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(plan_routes.router)

@app.get("/")
def root():
    return {"message": "SynapSense backend is running successfully"}

app.include_router(plan_router)

@app.get("/")
def home():
    return {"message": "SynapSense backend is running 🚀"}

import os

print("OPENAI_API_KEY =", os.getenv("OPENAI_API_KEY"))






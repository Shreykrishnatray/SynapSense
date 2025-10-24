from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import plan_routes

app = FastAPI(
    title="SynapSense AI Planner",
    description="Backend API for AI-driven task planning and visualization",
    version="1.0.0"
)

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all route files
app.include_router(plan_routes.router)

@app.get("/")
def root():
    return {"message": "SynapSense backend is running successfully 🚀"}


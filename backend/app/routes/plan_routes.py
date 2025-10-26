from fastapi import APIRouter

router = APIRouter(
    prefix="/plan",
    tags=["Plan Routes"]
)

@router.get("/test")
def test_route():
    return {"message": "Plan route working"}

from fastapi import APIRouter, HTTPException
from app.utils.openai_helper import generate_plan_from_goal

router = APIRouter()

@router.post("/generate-plan")
def generate_plan(data: dict):
    goal = data.get("goal")
    if not goal:
        raise HTTPException(status_code=400, detail="Goal is required")

    plan = generate_plan_from_goal(goal)
    return {"goal": goal, "plan": plan}


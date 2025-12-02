from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.utils.openai_helper import generate_plan_from_goal
import re

router = APIRouter(prefix="/plan", tags=["Plan Routes"])

# -------------------- MODELS --------------------

class Task(BaseModel):
    id: str
    name: str
    start: int
    duration: int
    dependencies: Optional[List[str]] = []

class PlanResponse(BaseModel):
    goal: str
    tasks: List[Task]


# -------------------- HELPERS --------------------

def extract_steps(plan_text: str) -> List[str]:
    """
    Extract steps from AI text like:
    1. Step one
    2. Step two
    - Another step
    """
    steps = re.findall(r"(?:\d+\.\s*|-\s*)(.+)", plan_text)
    return [s.strip() for s in steps if len(s.strip()) > 0]


# -------------------- API ROUTE --------------------

@router.post("/generate-plan", response_model=PlanResponse)
async def generate_plan(data: dict):
    goal = data.get("goal")
    if not goal:
        raise HTTPException(status_code=400, detail="Goal is required")

    try:
        # AI raw text
        raw_plan = generate_plan_from_goal(goal)

        # Extract steps
        steps = extract_steps(raw_plan)

        if not steps:
            raise Exception("AI did not return structured numbered bullets.")

        # Convert steps -> tasks
        tasks: List[Task] = []
        for i, step in enumerate(steps):
            task_id = f"t{i+1}"
            start = max(0, i * 2)
            duration = 2

            # simple dependency: each task depends on previous one
            dependencies = [f"t{i}"] if i > 0 else []

            tasks.append(
                Task(
                    id=task_id,
                    name=step,
                    start=start,
                    duration=duration,
                    dependencies=dependencies
                )
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return PlanResponse(goal=goal, tasks=tasks)



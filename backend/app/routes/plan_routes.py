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
    start: int           # timeline unit (days)
    duration: int        # duration in days
    dependencies: Optional[List[str]] = []

class PlanResponse(BaseModel):
    goal: str
    tasks: List[Task]

# -------------------- HELPERS --------------------

def clean_task_name(text: str) -> str:
    """Removes markdown, numbering, and 'Subtask X.X:' noise"""
    text = re.sub(r"\*\*", "", text)
    text = re.sub(r"Subtask\s*\d+(\.\d+)*:\s*", "", text, flags=re.I)
    text = re.sub(r"^\d+(\.\d+)*\s*", "", text)
    return text.strip()

def extract_tasks_with_duration(plan_text: str):
    """
    Extracts:
    - Task name
    - Duration in days (converts weeks → days)
    Robust against extra newlines/spaces/markdown
    """
    # Split by lines
    lines = plan_text.splitlines()
    tasks = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Skip empty lines
        if not line:
            i += 1
            continue

        # Check if next line has duration
        duration_line = lines[i+1].strip() if i+1 < len(lines) else ""
        match = re.match(r"Duration:\s*(\d+)\s*(day|days|week|weeks)", duration_line, re.I)
        if match:
            value, unit = match.groups()
            duration = int(value)
            if unit.lower().startswith("week"):
                duration *= 7
            tasks.append({
                "name": clean_task_name(line),
                "duration": duration
            })
            i += 2  # skip duration line
        else:
            # No duration found, fallback to 1 day
            tasks.append({
                "name": clean_task_name(line),
                "duration": 1
            })
            i += 1
    return tasks

# -------------------- API ROUTE --------------------

@router.post("/generate-plan", response_model=PlanResponse)
async def generate_plan(data: dict):
    goal = data.get("goal")
    if not goal:
        raise HTTPException(status_code=400, detail="Goal is required")

    try:
        raw_plan = generate_plan_from_goal(goal)
        if not raw_plan or not raw_plan.strip():
            raise Exception("AI returned empty plan.")

        extracted = extract_tasks_with_duration(raw_plan)
        if not extracted:
            raise Exception("Could not extract tasks with durations from AI response.")

        tasks: List[Task] = []
        current_start = 0
        for i, item in enumerate(extracted):
            task_id = f"t{i+1}"
            tasks.append(
                Task(
                    id=task_id,
                    name=item["name"],
                    start=current_start,
                    duration=item["duration"],
                    dependencies=[f"t{i}"] if i > 0 else []
                )
            )
            current_start += item["duration"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return PlanResponse(goal=goal, tasks=tasks)





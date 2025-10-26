from openai import OpenAI
import os

# Load API key from .env file
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_plan_from_goal(goal: str):
    """
    Sends a request to OpenAI to generate a project plan
    based on the user's goal or project idea.
    """
    prompt = f"Break down the following goal into a detailed project plan with tasks, subtasks, and timelines:\n\nGoal: {goal}"

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # lightweight GPT-4 model
            messages=[
                {"role": "system", "content": "You are an expert project planner AI."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        plan_text = response.choices[0].message.content
        return plan_text
    except Exception as e:
        return f"Error generating plan: {str(e)}"


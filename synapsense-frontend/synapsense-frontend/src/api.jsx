export async function generatePlan(goal) {
  const response = await fetch("http://127.0.0.1:8000/plan/generate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  return response.json();
}


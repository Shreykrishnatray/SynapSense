import React, { useState } from "react";
import GoalInput from "./components/goalinput";
import PlanCard from "./components/PlanCard";
import MindMap from "./components/MindMap";
import { generatePlan } from "./api";

function App() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generatePlan(goal);
      setPlan(result.plan || result.message);
    } catch (error) {
      setPlan("⚠️ Error generating plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => handleGenerate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        SynapSense - Thought to Action 💡
      </h1>
      <GoalInput
        goal={goal}
        setGoal={setGoal}
        onGenerate={handleGenerate}
        loading={loading}
      />
      <PlanCard
        plan={plan}
        onRegenerate={handleRegenerate}
        loading={loading}
      />
      <MindMap plan={plan} />
    </div>
  );
}

export default App;


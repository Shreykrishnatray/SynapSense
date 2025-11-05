import React from "react";

export default function GoalInput({ goal, setGoal, onGenerate, loading }) {
  return (
    <div className="flex flex-col gap-3 p-4 max-w-2xl mx-auto">
      <textarea
        className="border p-3 rounded-md shadow-sm"
        rows="3"
        placeholder="Enter your goal, e.g. Build an AI-powered productivity app..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button
        onClick={onGenerate}
        disabled={loading || !goal}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>
    </div>
  );
}



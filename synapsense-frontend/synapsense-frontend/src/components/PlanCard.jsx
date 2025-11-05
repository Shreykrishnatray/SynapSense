import React from "react";

export default function PlanCard({ plan, onRegenerate, loading }) {
  if (!plan) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-4 bg-white shadow-md rounded-xl border">
      <h2 className="text-xl font-bold mb-2 text-gray-800">🧠 AI-Generated Plan</h2>
      <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md text-gray-700">
        {plan}
      </pre>
      <button
        onClick={onRegenerate}
        disabled={loading}
        className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? "Regenerating..." : "Regenerate Plan"}
      </button>
    </div>
  );
}

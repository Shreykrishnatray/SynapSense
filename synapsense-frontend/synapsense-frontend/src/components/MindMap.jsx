import React from "react";
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

export default function MindMap({ plan }) {
  if (!plan) return null;

  const lines = plan.split("\n").filter((line) => line.trim() !== "");
  if (lines.length === 0) return null;

  const nodes = lines.map((line, i) => ({
    id: `${i}`,
    data: { label: line.slice(0, 40) },
    position: { x: (i % 4) * 200, y: Math.floor(i / 4) * 100 },
  }));

  const edges = nodes.slice(1).map((node, i) => ({
    id: `e${i}-${i + 1}`,
    source: `${i}`,
    target: `${i + 1}`,
  }));

  return (
    <div className="h-[400px] w-full mt-6 border rounded-lg shadow-md">
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

interface Task {
  id: string;
  name: string;
  dependencies?: string[];
}

interface MindMapProps {
  items: Task[]; // Array of tasks from backend
}

const MindMap: React.FC<MindMapProps> = ({ items }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Create root node
    const rootNode: Node = {
      id: "root",
      data: { label: "Goal" },
      position: { x: 400, y: 50 },
      style: {
        padding: 12,
        borderRadius: 10,
        background: "#4f46e5",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        border: "2px solid #3730a3",
      },
    };

    // Create nodes for each task
    const taskNodes: Node[] = items.map((task, index) => ({
      id: task.id,
      data: { label: task.name },
      position: {
        x: 150 + (index % 3) * 250, // Simple grid layout
        y: 150 + Math.floor(index / 3) * 120,
      },
      style: {
        padding: 10,
        borderRadius: 8,
        background: "#e0e7ff",
        border: "1px solid #4f46e5",
        fontSize: 14,
      },
    }));

    // Create edges: connect dependencies or root
    const taskEdges: Edge[] = items.flatMap((task): Edge[] => {
      if (task.dependencies && task.dependencies.length > 0) {
        return task.dependencies.map((depId) => ({
          id: `edge-${depId}-${task.id}`,
          source: depId,
          target: task.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "hsl(280,70%,60%)", strokeWidth: 2 },
        }));
      }
      // If no dependencies, connect to root
      return [
        {
          id: `edge-root-${task.id}`,
          source: "root",
          target: task.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "hsl(195,100%,50%)", strokeWidth: 2 },
        },
      ];
    });

    setNodes([rootNode, ...taskNodes]);
    setEdges(taskEdges);
  }, [items]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#888" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;







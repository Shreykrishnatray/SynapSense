import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  BackgroundVariant,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Brain } from 'lucide-react';

interface MindMapProps {
  plan: string;
  goal: string;
}

// Custom node component with neural styling
const CustomNode = ({ data }: { data: { label: string; isRoot?: boolean } }) => (
  <div
    className={`px-6 py-4 rounded-xl border-2 transition-smooth backdrop-blur-sm ${
      data.isRoot
        ? 'bg-primary/20 border-primary shadow-neural min-w-[200px]'
        : 'bg-card/80 border-border/50 hover:border-primary/50 min-w-[180px]'
    }`}
  >
    <div className="flex items-center gap-2">
      {data.isRoot && <Brain className="w-5 h-5 text-primary flex-shrink-0" />}
      <p className={`font-semibold text-sm ${data.isRoot ? 'text-primary' : 'text-foreground'}`}>
        {data.label}
      </p>
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

/**
 * Mind Map Component
 * Interactive visualization using ReactFlow
 * Converts plan steps into connected nodes
 */
const MindMap = ({ plan, goal }: MindMapProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Parse plan into steps
    const steps = plan
      .split('\n')
      .filter(line => line.trim())
      .filter(line => /^\d+\./.test(line.trim()) || line.trim().startsWith('-'))
      .map(line => line.replace(/^\d+\.\s*|-\s*/, '').trim())
      .filter(step => step.length > 0);

    // Create root node for the goal
    const rootNode: Node = {
      id: 'root',
      type: 'custom',
      position: { x: 400, y: 50 },
      data: { label: goal.length > 50 ? goal.substring(0, 50) + '...' : goal, isRoot: true },
    };

    // Create nodes for each step in a circular/radial layout
    const stepNodes: Node[] = steps.slice(0, 8).map((step, index) => {
      const angle = (2 * Math.PI * index) / Math.min(steps.length, 8);
      const radius = 250;
      const x = 400 + radius * Math.cos(angle - Math.PI / 2);
      const y = 200 + radius * Math.sin(angle - Math.PI / 2);

      return {
        id: `step-${index}`,
        type: 'custom',
        position: { x, y },
        data: { 
          label: step.length > 40 ? step.substring(0, 40) + '...' : step 
        },
      };
    });

    // Create edges connecting root to all steps
    const stepEdges: Edge[] = stepNodes.map((node, index) => ({
      id: `edge-${index}`,
      source: 'root',
      target: node.id,
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: 'hsl(195, 100%, 50%)',
        strokeWidth: 2,
      },
    }));

    setNodes([rootNode, ...stepNodes]);
    setEdges(stepEdges);
  }, [plan, goal, setNodes, setEdges]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-neural">
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Mind Map</h3>
              <p className="text-sm text-muted-foreground">
                Interactive visualization of your plan
              </p>
            </div>
          </div>
        </div>

        {/* ReactFlow Canvas */}
        <div className="h-[600px] bg-neural-deep/50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            attributionPosition="bottom-left"
            className="bg-transparent"
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="hsl(195, 100%, 50%)"
              className="opacity-20"
            />
            <Controls 
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg"
            />
          </ReactFlow>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 bg-card/30">
          <p className="text-xs text-muted-foreground text-center">
            💡 Drag nodes to rearrange • Scroll to zoom • Click and drag to pan
          </p>
        </div>
      </div>
    </div>
  );
};

export default MindMap;

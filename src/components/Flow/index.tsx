"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProps,
  NodeChange,
  Node,
  EdgeChange,
  Edge,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: ReactFlowProps["nodes"] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
  {
    id: "3",
    position: { x: -100, y: 100 },
    data: { label: "Mom" },
  },
];

const initialEdges: ReactFlowProps["edges"] = [
  { id: "1-2", source: "1", target: "2", label: "to the" },
];

export const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        className="font-serif font-bold"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

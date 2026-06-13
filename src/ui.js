// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from 'reactflow';

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TimerNode } from './nodes/timerNode';
import { MergeNode } from './nodes/mergeNode';
import { TransformNode } from './nodes/transformNode';
import { NoteNode } from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;

const proOptions = {
  hideAttribution: true,
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  timer: TimerNode,
  merge: MergeNode,
  transform: TransformNode,
  note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const rawData =
        event?.dataTransfer?.getData(
          'application/reactflow'
        );

      if (!rawData) return;

      const { nodeType: type } =
        JSON.parse(rawData);

      if (!type || !reactFlowInstance) return;

      const position =
        reactFlowInstance.project({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="
        w-screen
        h-[70vh]
        rounded-2xl
        overflow-hidden
        border
        border-slate-200
        bg-slate-50
        shadow-xl
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: '#6366f1',
            strokeWidth: 2,
          },
        }}
      >
        <Background
          variant="dots"
          gap={20}
          size={1.5}
          color="#cbd5e1"
        />

        <Controls
          className="
            bg-white
            border
            border-slate-200
            rounded-xl
            shadow-md
          "
        />

        <MiniMap
          pannable
          zoomable
          nodeColor="#6366f1"
          maskColor="rgba(0,0,0,0.05)"
          className="
            !bg-white
            !border
            !border-slate-200
            !rounded-xl
            !shadow-md
          "
        />
      </ReactFlow>
    </div>
  );
};
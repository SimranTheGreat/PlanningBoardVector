// toolbar.js

import { DraggableNode } from './draggableNode';

const NODES = [
  { type: 'customInput', label: 'Input', icon: '→' },
  { type: 'llm', label: 'LLM', icon: '✦' },
  { type: 'customOutput', label: 'Output', icon: '←' },
  { type: 'text', label: 'Text', icon: 'T' },
  { type: 'filter', label: 'Filter', icon: '⛃' },
  { type: 'timer', label: 'Timer', icon: '⏱' },
  { type: 'merge', label: 'Merge', icon: '⇄' },
  { type: 'transform', label: 'Transform', icon: '⚡' },
  { type: 'note', label: 'Note', icon: '📝' },
];

export const PipelineToolbar = () => (
  <div className="px-6 py-4">
    <div
      className="
        flex flex-wrap gap-3
        rounded-2xl
        bg-white
        border border-slate-200
        shadow-sm
        p-4
      "
    >
      {NODES.map(({ type, label, icon }) => (
        <div key={type} className="group">
          <DraggableNode
            type={type}
            label={`${icon} ${label}`}
          />
        </div>
      ))}
    </div>
  </div>
);
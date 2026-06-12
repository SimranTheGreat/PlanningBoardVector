// noteNode.js
// A sticky-note annotation node — no handles, purely informational.

import { useState } from 'react';
import { BaseNode, NodeTextArea, NodeSelect } from './BaseNode';

const COLOR_OPTIONS = [
  { value: '#fde68a', label: '🟡 Yellow' },
  { value: '#bbf7d0', label: '🟢 Green'  },
  { value: '#bfdbfe', label: '🔵 Blue'   },
  { value: '#fecaca', label: '🔴 Red'    },
  { value: '#e9d5ff', label: '🟣 Purple' },
];

// Note node intentionally has no I/O handles — it's a canvas annotation.
export const NoteNode = ({ id, data }) => {
  const [body,  setBody]  = useState(data?.body  || 'Add a note…');
  const [color, setColor] = useState(data?.color || '#fde68a');

  return (
    <div className="opacity-[0.93]">
      <BaseNode
        id={id}
        label="Note"
        color="#78716c"
        icon="📝"
        inputs={[]}
        outputs={[]}
        minHeight={40}
      >
        <div className="rounded-md px-2 py-1.5 -mt-1" style={{ background: color }}>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={4}
            className="w-full bg-transparent border-none outline-none resize-y
                       font-patrick text-[13px] text-stone-800 leading-relaxed"
          />
        </div>
        <NodeSelect
          label="Colour"
          value={color}
          onChange={e => setColor(e.target.value)}
          options={COLOR_OPTIONS}
        />
      </BaseNode>
    </div>
  );
};

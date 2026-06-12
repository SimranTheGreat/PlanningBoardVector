// toolbar.js

import { DraggableNode } from './draggableNode';

const NODES = [
  // original
  { type: 'customInput',  label: 'Input'     },
  { type: 'llm',          label: 'LLM'       },
  { type: 'customOutput', label: 'Output'    },
  { type: 'text',         label: 'Text'      },
  // new
  { type: 'filter',       label: 'Filter'    },
  { type: 'timer',        label: 'Timer'     },
  { type: 'merge',        label: 'Merge'     },
  { type: 'transform',    label: 'Transform' },
  { type: 'note',         label: 'Note'      },
];

export const PipelineToolbar = () => (
  <div className="p-2.5">
    <div className="mt-5 flex flex-wrap gap-2.5">
      {NODES.map(({ type, label }) => (
        <DraggableNode key={type} type={type} label={label} />
      ))}
    </div>
  </div>
);

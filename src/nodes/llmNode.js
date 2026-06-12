// llmNode.js — rebuilt with BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeSelect } from './BaseNode';

const LLM_HANDLES = {
  inputs: [
    { id: 'system', label: 'system', position: 0.33 },
    { id: 'prompt', label: 'prompt', position: 0.66 },
  ],
  outputs: [
    { id: 'response', label: 'response' },
  ],
};

const MODEL_OPTIONS = [
  { value: 'gpt-4o',          label: 'GPT-4o'          },
  { value: 'gpt-4o-mini',     label: 'GPT-4o Mini'     },
  { value: 'claude-sonnet',   label: 'Claude Sonnet'   },
  { value: 'claude-haiku',    label: 'Claude Haiku'    },
];

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      label="LLM"
      color="#6366f1"
      icon="✦"
      inputs={LLM_HANDLES.inputs}
      outputs={LLM_HANDLES.outputs}
    >
      <NodeSelect
        label="Model"
        value={model}
        onChange={e => setModel(e.target.value)}
        options={MODEL_OPTIONS}
      />
    </BaseNode>
  );
};

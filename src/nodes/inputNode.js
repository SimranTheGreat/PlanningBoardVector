// inputNode.js — rebuilt with BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeTextField, NodeSelect } from './BaseNode';

const INPUT_HANDLES = {
  outputs: [{ id: 'value', label: 'value' }],
};

const TYPE_OPTIONS = [
  { value: 'Text',   label: 'Text'   },
  { value: 'File',   label: 'File'   },
  { value: 'Number', label: 'Number' },
];

export const InputNode = ({ id, data }) => {
  const [currName,  setCurrName]  = useState(data?.inputName  || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType  || 'Text');

  return (
    <BaseNode
      id={id}
      label="Input"
      color="#10b981"
      icon="→"
      outputs={INPUT_HANDLES.outputs}
    >
      <NodeTextField
        label="Name"
        value={currName}
        onChange={e => setCurrName(e.target.value)}
      />
      <NodeSelect
        label="Type"
        value={inputType}
        onChange={e => setInputType(e.target.value)}
        options={TYPE_OPTIONS}
      />
    </BaseNode>
  );
};

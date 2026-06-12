// outputNode.js — rebuilt with BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeTextField, NodeSelect } from './BaseNode';

const OUTPUT_HANDLES = {
  inputs: [{ id: 'value', label: 'value' }],
};

const TYPE_OPTIONS = [
  { value: 'Text',  label: 'Text'  },
  { value: 'Image', label: 'Image' },
  { value: 'File',  label: 'File'  },
];

export const OutputNode = ({ id, data }) => {
  const [currName,   setCurrName]   = useState(data?.outputName  || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType  || 'Text');

  return (
    <BaseNode
      id={id}
      label="Output"
      color="#f59e0b"
      icon="←"
      inputs={OUTPUT_HANDLES.inputs}
    >
      <NodeTextField
        label="Name"
        value={currName}
        onChange={e => setCurrName(e.target.value)}
      />
      <NodeSelect
        label="Type"
        value={outputType}
        onChange={e => setOutputType(e.target.value)}
        options={TYPE_OPTIONS}
      />
    </BaseNode>
  );
};

// transformNode.js
// Applies a JavaScript expression to reshape or compute over the incoming data.

import { useState } from 'react';
import { BaseNode, NodeTextArea, NodeToggle } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [expression, setExpression] = useState(
    data?.expression || 'data.map(item => ({ ...item, processed: true }))'
  );
  const [strictMode, setStrictMode] = useState(data?.strictMode || false);

  return (
    <BaseNode
      id={id}
      label="Transform"
      color="#8b5cf6"
      icon="ƒ"
      inputs={[
        { id: 'data', label: 'data' },
      ]}
      outputs={[
        { id: 'result', label: 'result' },
        { id: 'error',  label: 'error',  position: 0.8 },
      ]}
      minHeight={80}
    >
      <NodeTextArea
        label="Expression (JS)"
        value={expression}
        onChange={e => setExpression(e.target.value)}
        placeholder="data => ..."
        rows={4}
      />
      <NodeToggle
        label="Strict mode"
        checked={strictMode}
        onChange={e => setStrictMode(e.target.checked)}
      />
    </BaseNode>
  );
};

// mergeNode.js
// Waits for all connected inputs to arrive, then emits a merged object.

import { useState } from 'react';
import { BaseNode, NodeSelect, NodeToggle } from './BaseNode';

const STRATEGY_OPTIONS = [
  { value: 'all',   label: 'All inputs (AND)'   },
  { value: 'first', label: 'First input (race)'  },
  { value: 'any',   label: 'Any input (OR)'      },
];

export const MergeNode = ({ id, data }) => {
  const [strategy,    setStrategy]    = useState(data?.strategy    || 'all');
  const [flattenKeys, setFlattenKeys] = useState(data?.flattenKeys || false);

  return (
    <BaseNode
      id={id}
      label="Merge"
      color="#14b8a6"
      icon="⇄"
      inputs={[
        { id: 'a', label: 'A', position: 0.3 },
        { id: 'b', label: 'B', position: 0.5 },
        { id: 'c', label: 'C', position: 0.7 },
      ]}
      outputs={[
        { id: 'merged', label: 'merged' },
      ]}
    >
      <NodeSelect
        label="Strategy"
        value={strategy}
        onChange={e => setStrategy(e.target.value)}
        options={STRATEGY_OPTIONS}
      />
      <NodeToggle
        label="Flatten keys"
        checked={flattenKeys}
        onChange={e => setFlattenKeys(e.target.checked)}
      />
    </BaseNode>
  );
};

// filterNode.js
// Filters a stream of records based on a field/value condition.

import { useState } from 'react';
import { BaseNode, NodeTextField, NodeSelect } from './BaseNode';

const OPERATOR_OPTIONS = [
  { value: 'eq',       label: '= equals'          },
  { value: 'neq',      label: '≠ not equals'      },
  { value: 'contains', label: '∋ contains'        },
  { value: 'gt',       label: '> greater than'    },
  { value: 'lt',       label: '< less than'       },
];

export const FilterNode = ({ id, data }) => {
  const [field,    setField]    = useState(data?.field    || '');
  const [operator, setOperator] = useState(data?.operator || 'eq');
  const [value,    setValue]    = useState(data?.value    || '');

  return (
    <BaseNode
      id={id}
      label="Filter"
      color="#ec4899"
      icon="⧖"
      inputs={[
        { id: 'data', label: 'data' },
      ]}
      outputs={[
        { id: 'pass', label: 'pass',  position: 0.35 },
        { id: 'fail', label: 'fail',  position: 0.65 },
      ]}
    >
      <NodeTextField
        label="Field"
        value={field}
        onChange={e => setField(e.target.value)}
        placeholder="e.g. status"
      />
      <NodeSelect
        label="Operator"
        value={operator}
        onChange={e => setOperator(e.target.value)}
        options={OPERATOR_OPTIONS}
      />
      <NodeTextField
        label="Value"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="e.g. active"
      />
    </BaseNode>
  );
};

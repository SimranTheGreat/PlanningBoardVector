// filterNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeTextField,
  NodeSelect,
  NodeToggle,
} from './BaseNode';

const OPERATOR_OPTIONS = [
  { value: 'eq', label: '= equals' },
  { value: 'neq', label: '≠ not equals' },
  { value: 'contains', label: '∋ contains' },
  { value: 'startsWith', label: '↦ starts with' },
  { value: 'endsWith', label: '↤ ends with' },
  { value: 'gt', label: '> greater than' },
  { value: 'gte', label: '≥ greater/equal' },
  { value: 'lt', label: '< less than' },
  { value: 'lte', label: '≤ less/equal' },
  { value: 'isEmpty', label: '□ is empty' },
  { value: 'isNotEmpty', label: '■ is not empty' },
];

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(
    data?.field || ''
  );

  const [operator, setOperator] = useState(
    data?.operator || 'eq'
  );

  const [value, setValue] = useState(
    data?.value || ''
  );

  const [caseSensitive, setCaseSensitive] =
    useState(
      data?.caseSensitive || false
    );

  const showValueField =
    !['isEmpty', 'isNotEmpty'].includes(
      operator
    );

  const operatorLabel =
    OPERATOR_OPTIONS.find(
      (o) => o.value === operator
    )?.label || operator;

  return (
    <BaseNode
      id={id}
      label="Filter"
      color="#ec4899"
      icon="🔍"
      inputs={[
        {
          id: 'data',
          label: 'data',
        },
      ]}
      outputs={[
        {
          id: 'pass',
          label: 'pass',
          position: 0.35,
          color: '#22c55e',
        },
        {
          id: 'fail',
          label: 'fail',
          position: 0.65,
          color: '#ef4444',
        },
      ]}
      minHeight={220}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label className="field-label">
            Field
          </label>

          <input
            list="filter-fields"
            value={field}
            onChange={(e) =>
              setField(e.target.value)
            }
            placeholder="e.g. status"
            className="field-input"
          />

          <datalist id="filter-fields">
            <option value="status" />
            <option value="priority" />
            <option value="email" />
            <option value="type" />
            <option value="category" />
            <option value="source" />
            <option value="department" />
          </datalist>
        </div>

        <NodeSelect
          label="Operator"
          value={operator}
          onChange={(e) =>
            setOperator(e.target.value)
          }
          options={OPERATOR_OPTIONS}
        />

        {showValueField && (
          <NodeTextField
            label="Value"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder="e.g. active"
          />
        )}

        <NodeToggle
          label="Case Sensitive"
          checked={caseSensitive}
          onChange={() =>
            setCaseSensitive(
              !caseSensitive
            )
          }
        />

        <div
          className="
            mt-2
            rounded-lg
            border
            border-pink-200
            bg-pink-50
            px-3
            py-2
            text-xs
            text-pink-700
          "
        >
          <div className="font-semibold mb-1">
            Preview
          </div>

          <div>
            {field || 'field'}{' '}
            {operatorLabel
              .replace(/^[^a-zA-Z]+/, '')
              .toLowerCase()}
            {showValueField
              ? ` ${value || 'value'}`
              : ''}
          </div>

          <div className="mt-1 text-[10px] opacity-75">
            {caseSensitive
              ? 'Case Sensitive'
              : 'Case Insensitive'}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
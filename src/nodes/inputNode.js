// inputNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeTextField,
  NodeSelect,
  NodeToggle,
} from './BaseNode';

const TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'Number', label: 'Number' },
  { value: 'File', label: 'File' },
  { value: 'Email', label: 'Email' },
  { value: 'Password', label: 'Password' },
  { value: 'Boolean', label: 'Boolean' },
];

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName ||
      id.replace('customInput-', 'input_')
  );

  const [inputType, setInputType] = useState(
    data?.inputType || 'Text'
  );

  const [defaultValue, setDefaultValue] =
    useState(
      data?.defaultValue || ''
    );

  const [required, setRequired] =
    useState(
      data?.required || false
    );

  return (
    <BaseNode
      id={id}
      label="Input"
      color="#10b981"
      icon="📥"
      outputs={[
        {
          id: 'value',
          label: 'value',
        },
      ]}
      minHeight={260}
    >
      <div className="flex flex-col gap-3">
        <NodeTextField
          label="Name"
          value={currName}
          onChange={(e) =>
            setCurrName(e.target.value)
          }
          placeholder="customer_email"
        />

        <NodeSelect
          label="Type"
          value={inputType}
          onChange={(e) =>
            setInputType(e.target.value)
          }
          options={TYPE_OPTIONS}
        />

        <NodeTextField
          label="Default Value"
          value={defaultValue}
          onChange={(e) =>
            setDefaultValue(e.target.value)
          }
          placeholder="Optional"
        />

        <NodeToggle
          label="Required"
          checked={required}
          onChange={() =>
            setRequired(!required)
          }
        />

        <div
          className="
            rounded-lg
            border
            border-emerald-200
            bg-emerald-50
            px-3
            py-2
            text-xs
            text-emerald-700
          "
        >
          <div className="font-semibold mb-1">
            Preview
          </div>

          <div>
            <strong>{currName}</strong>
          </div>

          <div>
            Type: {inputType}
          </div>

          {defaultValue && (
            <div>
              Default: {defaultValue}
            </div>
          )}

          <div>
            {required
              ? 'Required'
              : 'Optional'}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
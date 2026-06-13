// outputNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeTextField,
  NodeSelect,
  NodeToggle,
} from './BaseNode';

const TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' },
  { value: 'File', label: 'File' },
  { value: 'JSON', label: 'JSON' },
  { value: 'CSV', label: 'CSV' },
];

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] =
    useState(
      data?.outputName ||
      id.replace(
        'customOutput-',
        'output_'
      )
    );

  const [outputType, setOutputType] =
    useState(
      data?.outputType || 'Text'
    );

  const [saveToFile, setSaveToFile] =
    useState(
      data?.saveToFile || false
    );

  const [timestamp, setTimestamp] =
    useState(
      data?.timestamp || false
    );

  return (
    <BaseNode
      id={id}
      label="Output"
      color="#f59e0b"
      icon="📤"
      minHeight={250}
      inputs={[
        {
          id: 'value',
          label: 'value',
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeTextField
          label="Name"
          value={currName}
          onChange={(e) =>
            setCurrName(
              e.target.value
            )
          }
          placeholder="result"
        />

        <NodeSelect
          label="Type"
          value={outputType}
          onChange={(e) =>
            setOutputType(
              e.target.value
            )
          }
          options={TYPE_OPTIONS}
        />

        <NodeToggle
          label="Save To File"
          checked={saveToFile}
          onChange={() =>
            setSaveToFile(
              !saveToFile
            )
          }
        />

        <NodeToggle
          label="Add Timestamp"
          checked={timestamp}
          onChange={() =>
            setTimestamp(
              !timestamp
            )
          }
        />

        <div
          className="
            rounded-lg
            border
            border-amber-200
            bg-amber-50
            px-3
            py-2
            text-xs
            text-amber-700
          "
        >
          <div className="font-semibold mb-1">
            Output Preview
          </div>

          <div>
            Name: {currName}
          </div>

          <div>
            Type: {outputType}
          </div>

          <div>
            Save File:{' '}
            {saveToFile
              ? 'Yes'
              : 'No'}
          </div>

          <div>
            Timestamp:{' '}
            {timestamp
              ? 'Yes'
              : 'No'}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
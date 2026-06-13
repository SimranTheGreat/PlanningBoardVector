// llmNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeSelect,
  NodeNumberField,
  NodeToggle,
} from './BaseNode';

const MODEL_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'claude-sonnet', label: 'Claude Sonnet' },
  { value: 'claude-haiku', label: 'Claude Haiku' },
];

const FORMAT_OPTIONS = [
  { value: 'text', label: 'Text' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
];

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(
    data?.model || 'gpt-4o'
  );

  const [temperature, setTemperature] =
    useState(
      data?.temperature ?? 0.7
    );

  const [maxTokens, setMaxTokens] =
    useState(
      data?.maxTokens ?? 1000
    );

  const [responseFormat, setResponseFormat] =
    useState(
      data?.responseFormat || 'text'
    );

  const [streaming, setStreaming] =
    useState(
      data?.streaming || false
    );

  const [jsonMode, setJsonMode] =
    useState(
      data?.jsonMode || false
    );

  return (
    <BaseNode
      id={id}
      label="LLM"
      color="#6366f1"
      icon="✦"
      minHeight={320}
      inputs={[
        {
          id: 'system',
          label: 'system',
          position: 0.3,
        },
        {
          id: 'prompt',
          label: 'prompt',
          position: 0.7,
        },
      ]}
      outputs={[
        {
          id: 'response',
          label: 'response',
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeSelect
          label="Model"
          value={model}
          onChange={(e) =>
            setModel(e.target.value)
          }
          options={MODEL_OPTIONS}
        />

        <NodeNumberField
          label="Temperature"
          value={temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={(e) =>
            setTemperature(
              Number(e.target.value)
            )
          }
        />

        <NodeNumberField
          label="Max Tokens"
          value={maxTokens}
          min={1}
          max={32000}
          step={100}
          onChange={(e) =>
            setMaxTokens(
              Number(e.target.value)
            )
          }
        />

        <NodeSelect
          label="Response Format"
          value={responseFormat}
          onChange={(e) =>
            setResponseFormat(
              e.target.value
            )
          }
          options={FORMAT_OPTIONS}
        />

        <NodeToggle
          label="Streaming"
          checked={streaming}
          onChange={() =>
            setStreaming(!streaming)
          }
        />

        <NodeToggle
          label="JSON Mode"
          checked={jsonMode}
          onChange={() =>
            setJsonMode(!jsonMode)
          }
        />

        <div
          className="
            mt-1
            rounded-lg
            border
            border-indigo-200
            bg-indigo-50
            px-3
            py-2
            text-xs
            text-indigo-700
          "
        >
          <div className="font-semibold mb-1">
            Configuration
          </div>

          <div>
            Model: {model}
          </div>

          <div>
            Temperature: {temperature}
          </div>

          <div>
            Tokens: {maxTokens}
          </div>

          <div>
            Format: {responseFormat}
          </div>

          <div>
            Streaming:{' '}
            {streaming ? 'On' : 'Off'}
          </div>

          <div>
            JSON Mode:{' '}
            {jsonMode ? 'On' : 'Off'}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
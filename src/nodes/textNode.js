import { useMemo, useState } from 'react';
import { BaseNode, NodeTextArea } from './BaseNode';

const VARIABLE_REGEX =
  /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = [
    ...text.matchAll(VARIABLE_REGEX),
  ];

  return [
    ...new Set(
      matches.map(match => match[1])
    ),
  ];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || '{{input}}'
  );

  const variables = useMemo(
    () => extractVariables(currText),
    [currText]
  );

  const inputs = variables.map(variable => ({
    id: variable,
    label: variable,
  }));

  const nodeWidth = Math.min(
    500,
    Math.max(
      260,
      currText.length * 4
    )
  );

  const nodeHeight = Math.max(
    120,
    80 + currText.split('\n').length * 28
  );

  return (
    <div style={{ width: nodeWidth }}>
      <BaseNode
        id={id}
        label="Text"
        color="#0ea5e9"
        icon="T"
        inputs={inputs}
        outputs={[
          {
            id: 'output',
            label: 'text',
          },
        ]}
        minHeight={nodeHeight}
      >
        <NodeTextArea
          label="Content"
          value={currText}
          onChange={(e) =>
            setCurrText(e.target.value)
          }
          placeholder="Use {{variable}} syntax..."
          rows={Math.max(
            3,
            currText.split('\n').length
          )}
        />
      </BaseNode>
    </div>
  );
};
import { useMemo, useState } from 'react';
import {
  BaseNode,
  NodeTextArea,
} from './BaseNode';

const VARIABLE_REGEX =
  /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = [
    ...text.matchAll(VARIABLE_REGEX),
  ];

  return [
    ...new Set(
      matches.map(
        (match) => match[1]
      )
    ),
  ];
};

export const TextNode = ({
  id,
  data,
}) => {
  const [currText, setCurrText] =
    useState(
      data?.text ||
      '{{input}}'
    );

  const variables = useMemo(
    () =>
      extractVariables(
        currText
      ),
    [currText]
  );

  const inputs = variables.map(
    (variable) => ({
      id: variable,
      label: variable,
    })
  );

  const lineCount =
    currText.split('\n').length;

  const nodeHeight =
    Math.max(
      220,
      120 +
        lineCount * 24
    );

  return (
    <BaseNode
      id={id}
      label="Text"
      color="#0ea5e9"
      icon="T"
      minHeight={
        nodeHeight
      }
      inputs={inputs}
      outputs={[
        {
          id: 'output',
          label: 'text',
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeTextArea
          label="Content"
          value={currText}
          onChange={(e) =>
            setCurrText(
              e.target.value
            )
          }
          placeholder="Use {{variable}} syntax..."
          rows={Math.max(
            4,
            lineCount
          )}
        />

        <div
          className="
            rounded-lg
            border
            border-sky-200
            bg-sky-50
            px-3
            py-2
          "
        >
          <div
            className="
              text-xs
              font-semibold
              text-sky-700
              mb-2
            "
          >
            Detected Variables
          </div>

          {variables.length === 0 ? (
            <div
              className="
                text-xs
                text-slate-500
              "
            >
              No variables detected
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {variables.map(
                (variable) => (
                  <span
                    key={
                      variable
                    }
                    className="
                      px-2
                      py-1
                      rounded-full
                      text-xs
                      bg-sky-100
                      text-sky-700
                      border
                      border-sky-200
                    "
                  >
                    {variable}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        <div
          className="
            text-[11px]
            text-slate-500
          "
        >
          Variables enclosed in
          {' '}
          {'{{ }}'}
          {' '}
          automatically
          create input handles.
        </div>
      </div>
    </BaseNode>
  );
};
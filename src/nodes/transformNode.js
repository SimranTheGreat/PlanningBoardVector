// transformNode.js

import { useMemo, useState } from 'react';
import {
  BaseNode,
  NodeTextArea,
  NodeToggle,
  NodeSelect,
} from './BaseNode';

const LANGUAGE_OPTIONS = [
  { value: 'js', label: 'JavaScript' },
  { value: 'json', label: 'JSON Mapper' },
];

export const TransformNode = ({
  id,
  data,
}) => {
  const [expression, setExpression] =
    useState(
      data?.expression ||
      'data.map(item => ({ ...item, processed: true }))'
    );

  const [strictMode, setStrictMode] =
    useState(
      data?.strictMode || false
    );

  const [language, setLanguage] =
    useState(
      data?.language || 'js'
    );

  const stats = useMemo(() => {
    const lines =
      expression.split('\n').length;

    const chars =
      expression.length;

    return {
      lines,
      chars,
    };
  }, [expression]);

  return (
    <BaseNode
      id={id}
      label="Transform"
      color="#8b5cf6"
      icon="ƒ"
      minHeight={420}
      inputs={[
        {
          id: 'data',
          label: 'data',
        },
      ]}
      outputs={[
        {
          id: 'result',
          label: 'result',
          position: 0.3,
        },
        {
          id: 'error',
          label: 'error',
          position: 0.75,
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeSelect
          label="Language"
          value={language}
          onChange={(e) =>
            setLanguage(
              e.target.value
            )
          }
          options={LANGUAGE_OPTIONS}
        />

        <div>
          <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
            Expression
          </div>

          <textarea
            value={expression}
            onChange={(e) =>
              setExpression(
                e.target.value
              )
            }
            rows={6}
            spellCheck={false}
            className="
              w-full
              rounded-lg
              border
              border-violet-200
              bg-slate-950
              text-green-400
              font-mono
              text-xs
              p-3
              resize-y
              outline-none
            "
          />
        </div>

        <NodeToggle
          label="Strict Mode"
          checked={strictMode}
          onChange={(e) =>
            setStrictMode(
              e.target.checked
            )
          }
        />

        <div
          className="
            rounded-lg
            border
            border-violet-200
            bg-violet-50
            p-3
            text-xs
          "
        >
          <div className="font-semibold text-violet-700 mb-2">
            Transformation Stats
          </div>

          <div>
            Lines: {stats.lines}
          </div>

          <div>
            Characters: {stats.chars}
          </div>

          <div>
            Mode:{' '}
            {strictMode
              ? 'Strict'
              : 'Standard'}
          </div>

          <div>
            Runtime:{' '}
            {language === 'js'
              ? 'JavaScript'
              : 'JSON'}
          </div>
        </div>

        <div
          className="
            rounded-lg
            bg-slate-100
            p-2
            text-[11px]
            text-slate-600
          "
        >
          Example:
          <br />
          <code>
            data.map(item =&gt; (
            {'{'}
            ...item,
            processed: true
            {'}'}
            ))
          </code>
        </div>
      </div>
    </BaseNode>
  );
};
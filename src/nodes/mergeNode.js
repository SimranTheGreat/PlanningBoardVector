// mergeNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeSelect,
  NodeToggle,
} from './BaseNode';

const STRATEGY_OPTIONS = [
  {
    value: 'all',
    label: 'All inputs (AND)',
  },
  {
    value: 'first',
    label: 'First input wins',
  },
  {
    value: 'any',
    label: 'Any input (OR)',
  },
  {
    value: 'concat',
    label: 'Concatenate arrays',
  },
];

export const MergeNode = ({
  id,
  data,
}) => {
  const [strategy, setStrategy] =
    useState(
      data?.strategy || 'all'
    );

  const [flattenKeys, setFlattenKeys] =
    useState(
      data?.flattenKeys || false
    );

  const [deduplicate, setDeduplicate] =
    useState(
      data?.deduplicate || false
    );

  return (
    <BaseNode
      id={id}
      label="Merge"
      color="#14b8a6"
      icon="⇄"
      minHeight={280}
      inputs={[
        {
          id: 'a',
          label: 'Input A',
          position: 0.25,
        },
        {
          id: 'b',
          label: 'Input B',
          position: 0.5,
        },
        {
          id: 'c',
          label: 'Input C',
          position: 0.75,
        },
      ]}
      outputs={[
        {
          id: 'merged',
          label: 'merged',
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeSelect
          label="Strategy"
          value={strategy}
          onChange={(e) =>
            setStrategy(
              e.target.value
            )
          }
          options={
            STRATEGY_OPTIONS
          }
        />

        <NodeToggle
          label="Flatten Keys"
          checked={flattenKeys}
          onChange={() =>
            setFlattenKeys(
              !flattenKeys
            )
          }
        />

        <NodeToggle
          label="Remove Duplicates"
          checked={deduplicate}
          onChange={() =>
            setDeduplicate(
              !deduplicate
            )
          }
        />

        <div
          className="
            rounded-lg
            border
            border-teal-200
            bg-teal-50
            px-3
            py-2
            text-xs
            text-teal-700
          "
        >
          <div className="font-semibold mb-1">
            Merge Preview
          </div>

          <div>
            Strategy:
            {' '}
            {STRATEGY_OPTIONS.find(
              (s) =>
                s.value ===
                strategy
            )?.label}
          </div>

          <div>
            Flatten:
            {' '}
            {flattenKeys
              ? 'Yes'
              : 'No'}
          </div>

          <div>
            Deduplicate:
            {' '}
            {deduplicate
              ? 'Yes'
              : 'No'}
          </div>
        </div>

        <div
          className="
            text-[11px]
            text-slate-500
            italic
          "
        >
          A + B + C → merged
        </div>
      </div>
    </BaseNode>
  );
};
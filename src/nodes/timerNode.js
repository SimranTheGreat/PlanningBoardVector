// timerNode.js

import { useState, useMemo } from 'react';
import {
  BaseNode,
  NodeNumberField,
  NodeSelect,
  NodeToggle,
} from './BaseNode';

const UNIT_OPTIONS = [
  { value: 'ms', label: 'Milliseconds' },
  { value: 's', label: 'Seconds' },
  { value: 'min', label: 'Minutes' },
  { value: 'hr', label: 'Hours' },
];

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(
    data?.delay || 1
  );

  const [unit, setUnit] = useState(
    data?.unit || 's'
  );

  const [repeat, setRepeat] = useState(
    data?.repeat || false
  );

  const [maxRuns, setMaxRuns] = useState(
    data?.maxRuns || 10
  );

  const [enabled, setEnabled] = useState(
    data?.enabled ?? true
  );

  const delayInMs = useMemo(() => {
    switch (unit) {
      case 'ms':
        return delay;
      case 's':
        return delay * 1000;
      case 'min':
        return delay * 60000;
      case 'hr':
        return delay * 3600000;
      default:
        return delay;
    }
  }, [delay, unit]);

  return (
    <BaseNode
      id={id}
      label="Timer"
      color="#f97316"
      icon="⏱"
      minHeight={320}
      inputs={[
        {
          id: 'trigger',
          label: 'trigger',
        },
      ]}
      outputs={[
        {
          id: 'tick',
          label: 'tick',
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        <NodeNumberField
          label="Delay"
          value={delay}
          onChange={(e) =>
            setDelay(
              Number(
                e.target.value
              )
            )
          }
          min={0}
          step={1}
        />

        <NodeSelect
          label="Unit"
          value={unit}
          onChange={(e) =>
            setUnit(
              e.target.value
            )
          }
          options={UNIT_OPTIONS}
        />

        <NodeToggle
          label="Repeat"
          checked={repeat}
          onChange={(e) =>
            setRepeat(
              e.target.checked
            )
          }
        />

        {repeat && (
          <NodeNumberField
            label="Max Runs"
            value={maxRuns}
            onChange={(e) =>
              setMaxRuns(
                Number(
                  e.target.value
                )
              )
            }
            min={1}
            step={1}
          />
        )}

        <NodeToggle
          label="Enabled"
          checked={enabled}
          onChange={(e) =>
            setEnabled(
              e.target.checked
            )
          }
        />

        <div
          className="
            rounded-lg
            border
            border-orange-200
            bg-orange-50
            p-3
            text-xs
          "
        >
          <div className="font-semibold text-orange-700 mb-2">
            Timer Preview
          </div>

          <div>
            Delay: {delay} {unit}
          </div>

          <div>
            Milliseconds: {delayInMs.toLocaleString()}
          </div>

          <div>
            Mode:{' '}
            {repeat
              ? 'Repeating'
              : 'One Time'}
          </div>

          <div>
            Status:{' '}
            {enabled
              ? 'Enabled'
              : 'Disabled'}
          </div>

          {repeat && (
            <div>
              Max Runs: {maxRuns}
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};
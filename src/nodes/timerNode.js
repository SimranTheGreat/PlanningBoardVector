// timerNode.js
// Introduces a scheduled delay or periodic trigger into the pipeline.

import { useState } from 'react';
import { BaseNode, NodeNumberField, NodeSelect, NodeToggle } from './BaseNode';

const UNIT_OPTIONS = [
  { value: 'ms',  label: 'Milliseconds' },
  { value: 's',   label: 'Seconds'      },
  { value: 'min', label: 'Minutes'      },
  { value: 'hr',  label: 'Hours'        },
];

export const TimerNode = ({ id, data }) => {
  const [delay,    setDelay]    = useState(data?.delay    || 1);
  const [unit,     setUnit]     = useState(data?.unit     || 's');
  const [repeat,   setRepeat]   = useState(data?.repeat   || false);

  return (
    <BaseNode
      id={id}
      label="Timer"
      color="#f97316"
      icon="⏱"
      inputs={[
        { id: 'trigger', label: 'trigger' },
      ]}
      outputs={[
        { id: 'tick', label: 'tick' },
      ]}
    >
      <NodeNumberField
        label="Delay"
        value={delay}
        onChange={e => setDelay(Number(e.target.value))}
        min={0}
        step={1}
      />
      <NodeSelect
        label="Unit"
        value={unit}
        onChange={e => setUnit(e.target.value)}
        options={UNIT_OPTIONS}
      />
      <NodeToggle
        label="Repeat"
        checked={repeat}
        onChange={e => setRepeat(e.target.checked)}
      />
    </BaseNode>
  );
};

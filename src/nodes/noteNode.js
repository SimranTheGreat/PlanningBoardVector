// noteNode.js

import { useState } from 'react';
import {
  BaseNode,
  NodeSelect,
} from './BaseNode';

const COLOR_OPTIONS = [
  { value: '#fde68a', label: '🟡 Yellow' },
  { value: '#bbf7d0', label: '🟢 Green' },
  { value: '#bfdbfe', label: '🔵 Blue' },
  { value: '#fecaca', label: '🔴 Red' },
  { value: '#e9d5ff', label: '🟣 Purple' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: '🟢 Low' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'high', label: '🔴 High' },
];

export const NoteNode = ({ id, data }) => {
  const [title, setTitle] = useState(
    data?.title || 'Note'
  );

  const [body, setBody] = useState(
    data?.body || ''
  );

  const [color, setColor] = useState(
    data?.color || '#fde68a'
  );

  const [priority, setPriority] =
    useState(
      data?.priority || 'medium'
    );

  return (
    <div className="opacity-95">
      <BaseNode
        id={id}
        label="Note"
        color="#78716c"
        icon="📝"
        inputs={[]}
        outputs={[]}
        minHeight={340}
      >
        <div
          className="
            rounded-xl
            shadow-inner
            p-3
            mb-3
            border
            border-black/10
          "
          style={{
            background: color,
          }}
        >
          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="
              w-full
              mb-2
              bg-transparent
              border-none
              outline-none
              font-bold
              text-base
              text-stone-800
            "
          />

          <textarea
            value={body}
            onChange={(e) =>
              setBody(
                e.target.value
              )
            }
            placeholder="Write your note here..."
            rows={5}
            className="
              w-full
              bg-transparent
              border-none
              outline-none
              resize-none
              text-sm
              text-stone-700
              leading-relaxed
            "
          />
        </div>

        <NodeSelect
          label="Colour"
          value={color}
          onChange={(e) =>
            setColor(
              e.target.value
            )
          }
          options={COLOR_OPTIONS}
        />

        <NodeSelect
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
          options={
            PRIORITY_OPTIONS
          }
        />

        <div
          className="
            mt-3
            rounded-lg
            border
            border-stone-200
            bg-stone-50
            px-3
            py-2
            text-xs
            text-stone-600
          "
        >
          <div className="font-semibold mb-1">
            Summary
          </div>

          <div>
            Title: {title}
          </div>

          <div>
            Priority:{' '}
            {priority}
          </div>

          <div>
            Characters:{' '}
            {body.length}
          </div>
        </div>
      </BaseNode>
    </div>
  );
};
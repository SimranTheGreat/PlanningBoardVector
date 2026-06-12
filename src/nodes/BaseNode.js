import { Handle, Position } from 'reactflow';

const NODE_WIDTH = 280;

const HandleLabel = ({ label, side }) => (
  <span
    className={`
      absolute
      top-1/2
      -translate-y-1/2
      text-[10px]
      text-slate-500
      whitespace-nowrap
      pointer-events-none
      select-none
      ${side === 'left' ? '-left-16' : '-right-16'}
    `}
  >
    {label}
  </span>
);

export const NodeTextField = ({ label, value, onChange, placeholder }) => (
  <label className="field-wrapper">
    <span className="field-label">{label}</span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="field-input"
    />
  </label>
);

export const NodeTextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => (
  <label className="field-wrapper">
    <span className="field-label">{label}</span>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="field-textarea"
    />
  </label>
);

export const NodeSelect = ({
  label,
  value,
  onChange,
  options,
}) => (
  <label className="field-wrapper">
    <span className="field-label">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className="field-select"
    >
      {options.map(({ value: v, label: l }) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  </label>
);

export const NodeNumberField = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}) => (
  <label className="field-wrapper">
    <span className="field-label">{label}</span>
    <input
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="field-input"
    />
  </label>
);

export const NodeToggle = ({
  label,
  checked,
  onChange,
}) => (
  <label className="field-toggle">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <span>{label}</span>
  </label>
);

const handleTop = (index, total, override) => {
  if (override !== undefined) {
    return `${override * 100}%`;
  }

  if (total === 1) {
    return '50%';
  }

  const step = 60 / (total - 1);

  return `${20 + step * index}%`;
};

export const BaseNode = ({
  id,
  label,
  color = '#4f46e5',
  icon,
  inputs = [],
  outputs = [],
  minHeight = 60,
  children,
}) => {
  return (
    <div
      className="pipeline-node hover:shadow-node-hover"
      style={{ width: NODE_WIDTH }}
    >
      {/* Header */}
      <div
        className="node-header"
        style={{ background: color }}
      >
        {icon && (
          <span className="text-sm leading-none">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </div>

      {/* Body */}
      <div
        className="node-body"
        style={{ minHeight }}
      >
        {children}
      </div>

      {inputs.map((h, i) => (
        <div
          key={h.id}
          className="absolute left-0 -translate-y-1/2"
          style={{
            top: handleTop(
              i,
              inputs.length,
              h.position
            ),
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            className="
              !w-2.5
              !h-2.5
              !border-2
              !border-white
            "
            style={{
              background: color,
              left: -5,
            }}
          />

          <HandleLabel
            label={h.label}
            side="left"
          />
        </div>
      ))}

      {outputs.map((h, i) => (
        <div
          key={h.id}
          className="absolute right-0 -translate-y-1/2"
          style={{
            top: handleTop(
              i,
              outputs.length,
              h.position
            ),
          }}
        >
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            className="
              !w-2.5
              !h-2.5
              !border-2
              !border-white
            "
            style={{
              background: color,
              right: -5,
            }}
          />

          <HandleLabel
            label={h.label}
            side="right"
          />
        </div>
      ))}
    </div>
  );
};
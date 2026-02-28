import { Handle } from 'reactflow';

export const NodeCard = ({
  title,
  subtitle,
  controls,
  handles,
  width = 260,
  height = 150,
  accent = 'var(--accent-1)',
  className = '',
}) => {
  return (
    <div
      className={`node-card ${className}`.trim()}
      style={{
        width,
        minHeight: height,
        '--node-accent': accent,
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={handle.style}
        />
      ))}

      <div className="node-card__header">
        <h4>{title}</h4>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="node-card__body">{controls}</div>
    </div>
  );
};

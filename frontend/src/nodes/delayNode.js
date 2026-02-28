import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const DelayNode = ({ id, data }) => {
  const [ms, setMs] = useState(data?.delayMs || 500);

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'input' }],
        outputs: [{ key: 'output' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Delay"
      subtitle="Wait before passing"
      accent="var(--accent-4)"
      handles={handles}
      controls={
        <label className="node-field">
          <span>Milliseconds</span>
          <input
            type="number"
            min="0"
            step="50"
            value={ms}
            onChange={(e) => setMs(e.target.value)}
          />
        </label>
      }
    />
  );
};

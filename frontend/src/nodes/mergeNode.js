import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const MergeNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'append');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'left' }, { key: 'right' }],
        outputs: [{ key: 'merged' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Merge"
      subtitle="Combine streams"
      accent="var(--accent-5)"
      handles={handles}
      controls={
        <label className="node-field">
          <span>Mode</span>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="append">Append</option>
            <option value="zip">Zip</option>
            <option value="overwrite">Overwrite</option>
          </select>
        </label>
      }
    />
  );
};

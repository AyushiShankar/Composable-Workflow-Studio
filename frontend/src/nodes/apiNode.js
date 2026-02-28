import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'url' }, { key: 'payload' }],
        outputs: [{ key: 'response' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="API"
      subtitle="Fetch external data"
      accent="var(--accent-3)"
      handles={handles}
      controls={
        <label className="node-field">
          <span>Method</span>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      }
    />
  );
};

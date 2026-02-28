import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'items' }],
        outputs: [{ key: 'match' }, { key: 'rest' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Filter"
      subtitle="Branch by condition"
      accent="var(--accent-2)"
      handles={handles}
      controls={
        <label className="node-field">
          <span>Condition</span>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
        </label>
      }
    />
  );
};

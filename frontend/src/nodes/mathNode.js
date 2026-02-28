import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'a' }, { key: 'b' }],
        outputs: [{ key: 'result' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Math"
      subtitle="Compute values"
      accent="var(--accent-1)"
      handles={handles}
      controls={
        <label className="node-field">
          <span>Operation</span>
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (x)</option>
            <option value="divide">Divide (/)</option>
          </select>
        </label>
      }
    />
  );
};

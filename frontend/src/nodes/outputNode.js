import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'value' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Output"
      subtitle="Pipeline result"
      accent="var(--accent-3)"
      handles={handles}
      controls={
        <>
          <label className="node-field">
            <span>Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="node-field">
            <span>Type</span>
            <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="Image">Image</option>
            </select>
          </label>
        </>
      }
    />
  );
};

import { useMemo, useState } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        outputs: [{ key: 'value' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="Input"
      subtitle="Pipeline entry"
      accent="var(--accent-2)"
      handles={handles}
      controls={
        <>
          <label className="node-field">
            <span>Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="node-field">
            <span>Type</span>
            <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </>
      }
    />
  );
};

import { useMemo } from 'react';
import { NodeCard } from './NodeCard';
import { createNodeHandles } from './nodeUtils';

export const LLMNode = ({ id }) => {
  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: [{ key: 'system' }, { key: 'prompt' }],
        outputs: [{ key: 'response' }],
      }),
    [id]
  );

  return (
    <NodeCard
      title="LLM"
      subtitle="Prompt and generate"
      accent="var(--accent-4)"
      handles={handles}
      controls={
        <div className="node-copy">
          <strong>Model:</strong> `gpt-4.1`
        </div>
      }
    />
  );
};

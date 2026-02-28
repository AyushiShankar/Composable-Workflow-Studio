import { useEffect, useMemo, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { NodeCard } from './NodeCard';
import {
  computeTextNodeSize,
  createNodeHandles,
  extractTemplateVariables,
} from './nodeUtils';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractTemplateVariables(text), [text]);
  const size = useMemo(() => computeTextNodeSize(text, variables.length), [text, variables.length]);

  const handles = useMemo(
    () =>
      createNodeHandles({
        id,
        inputs: variables.map((variableName) => ({ key: variableName })),
        outputs: [{ key: 'output' }],
      }),
    [id, variables]
  );

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variables]);

  return (
    <NodeCard
      title="Text"
      subtitle={`Variables: ${variables.length}`}
      width={size.width}
      height={size.height}
      accent="var(--accent-5)"
      handles={handles}
      controls={
        <>
          <label className="node-field node-field--grow">
            <span>Template</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Use {{variableName}} to add dynamic handles"
            />
          </label>
          {variables.length > 0 ? (
            <p className="node-help">Detected: {variables.join(', ')}</p>
          ) : (
            <p className="node-help">Tip: write {'{{myVar}}'} to add an input handle.</p>
          )}
        </>
      }
    />
  );
};

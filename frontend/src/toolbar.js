import { DraggableNode } from './draggableNode';

const NODE_CATALOG = [
  { type: 'customInput', label: 'Input', emoji: 'IN' },
  { type: 'llm', label: 'LLM', emoji: 'AI' },
  { type: 'customOutput', label: 'Output', emoji: 'OUT' },
  { type: 'text', label: 'Text', emoji: 'TXT' },
  { type: 'math', label: 'Math', emoji: 'MTH' },
  { type: 'filter', label: 'Filter', emoji: 'FLT' },
  { type: 'api', label: 'API', emoji: 'API' },
  { type: 'delay', label: 'Delay', emoji: 'DLY' },
  { type: 'merge', label: 'Merge', emoji: 'MRG' },
];

export const PipelineToolbar = () => {
  return (
    <aside className="pipeline-toolbar">
      <div className="toolbar-title-wrap">
        <h2>Node Library</h2>
        <p>Drag nodes onto the canvas</p>
      </div>
      <div className="toolbar-grid">
        {NODE_CATALOG.map((nodeDef) => (
          <DraggableNode
            key={nodeDef.type}
            type={nodeDef.type}
            label={nodeDef.label}
            glyph={nodeDef.emoji}
          />
        ))}
      </div>
    </aside>
  );
};

export const DraggableNode = ({ type, label, glyph }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.target.style.cursor = 'grab';
      }}
      draggable
    >
      <span className="draggable-node__glyph">{glyph}</span>
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};

## Overview
This project is a small visual pipeline builder with a React frontend and a FastAPI backend.

- Frontend lets users drag nodes to a canvas, connect them, and submit the graph.
- Backend parses the submitted graph and returns:
  - `num_nodes`
  - `num_edges`
  - `is_dag` (whether the graph is a Directed Acyclic Graph)

---

## Project Structure

- `/Users/ayushimishra/Downloads/frontend_technical_assessment/frontend`
  - React app using `reactflow` + Zustand store.
- `/Users/ayushimishra/Downloads/frontend_technical_assessment/backend`
  - FastAPI app with `/pipelines/parse` endpoint.
- `/Users/ayushimishra/Downloads/frontend_technical_assessment/DOCUMENTATION.md`
  - This document.

---

## Frontend Architecture

### Core files

- `frontend/src/App.js`
  - Main app shell layout (header, toolbar, canvas, submit area).

- `frontend/src/ui.js`
  - React Flow canvas setup.
  - Registers `nodeTypes`.
  - Handles drag/drop node creation and edge/node change handlers.

- `frontend/src/store.js`
  - Global state via Zustand:
    - `nodes`, `edges`, `nodeIDs`
    - `getNodeID`, `addNode`
    - `onNodesChange`, `onEdgesChange`, `onConnect`
    - `updateNodeField`

- `frontend/src/toolbar.js`
  - Node catalog list used to render draggable node cards.

- `frontend/src/draggableNode.js`
  - Generic draggable node item.
  - Writes node type into drag payload (`application/reactflow`).

- `frontend/src/submit.js`
  - Reads nodes and edges from store.
  - Sends payload to backend `/pipelines/parse`.
  - Shows browser alert with parsed summary.

- `frontend/src/index.css`
  - Unified styling for app shell, toolbar, node cards, canvas, and controls.

---

## Node Abstraction

### Shared abstraction

- `frontend/src/nodes/NodeCard.js`
  - Reusable UI wrapper for all nodes.
  - Handles:
    - card layout
    - title/subtitle
    - shared control area
    - rendered handles
    - width/height/accent customization

- `frontend/src/nodes/nodeUtils.js`
  - Shared logic utilities:
    - `createNodeHandles({ id, inputs, outputs })`
      - Auto-generates left target handles and right source handles.
      - Distributes handles vertically.
    - `extractTemplateVariables(text)`
      - Parses `{{variable}}` tokens for valid JavaScript identifiers.
      - Returns ordered unique variable names.
    - `computeTextNodeSize(text, variableCount)`
      - Computes dynamic width/height for Text node based on content.

### Existing nodes refactored to abstraction

- `inputNode.js`
- `outputNode.js`
- `llmNode.js`
- `textNode.js`

### New nodes added (5)

- `mathNode.js`
- `filterNode.js`
- `apiNode.js`
- `delayNode.js`
- `mergeNode.js`

All nodes now share the same base visual structure and handle-generation pattern.

---

## Text Node Logic

File: `frontend/src/nodes/textNode.js`

### 1) Dynamic size
- Node width/height grows with text length and line count using `computeTextNodeSize`.
- This improves readability for larger templates.

### 2) Variable handles
- Variables are detected in `{{ ... }}` format.
- Only valid JavaScript variable names are accepted.
- For each detected variable, a left input handle is created.
- Handles update dynamically as users edit text.

Example:
- Input text: `Hello {{name}}, your id is {{userId}}`
- Input handles created:
  - `${id}-name`
  - `${id}-userId`

---

## Backend Integration

File: `backend/main.py`

### Endpoint
- `POST /pipelines/parse`
- Request body:
  - `nodes: list[object]`
  - `edges: list[{ source: string, target: string }]`

### Response

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

### DAG algorithm
- Uses Kahn’s algorithm (in-degree + queue).
- Invalid edges (source/target not present in node IDs) mark graph as not DAG.
- Duplicate/missing node ID inconsistencies also mark graph as not DAG.

### CORS
- CORS middleware is enabled for frontend-backend local integration.

---

## Data Flow (Submit)

1. User builds graph in canvas.
2. `SubmitButton` reads `nodes` and `edges` from Zustand store.
3. Frontend sends POST JSON to `http://localhost:8000/pipelines/parse` (or `REACT_APP_API_BASE_URL`).
4. Backend returns summary object.
5. Frontend displays alert with:
   - number of nodes
   - number of edges
   - DAG status

---

## Run Instructions

## Backend

```bash
cd /Users/ayushimishra/Downloads/frontend_technical_assessment/backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install fastapi "uvicorn[standard]"
python -m uvicorn main:app --reload --port 8000
```

## Frontend

```bash
cd /Users/ayushimishra/Downloads/frontend_technical_assessment/frontend
npm install
npm start
```

If backend runs on another host/port, set:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

---

## Extending With New Nodes

Recommended pattern:

1. Create `frontend/src/nodes/<yourNode>.js`.
2. Use `NodeCard` for layout.
3. Define handles with `createNodeHandles`.
4. Register the node type in `frontend/src/ui.js`.
5. Add to toolbar catalog in `frontend/src/toolbar.js`.

This keeps new node creation fast and consistent with shared styles.

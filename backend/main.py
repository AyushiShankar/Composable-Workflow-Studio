from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)


class PipelineEdge(BaseModel):
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[PipelineEdge] = Field(default_factory=list)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_directed_acyclic_graph(node_ids: set[str], edges: list[PipelineEdge]) -> bool:
    adjacency: dict[str, list[str]] = defaultdict(list)
    in_degree: dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            return False

        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    node_ids = {node.get('id') for node in payload.nodes if node.get('id')}
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    ids_are_valid = len(node_ids) == num_nodes
    is_dag = ids_are_valid and (
        is_directed_acyclic_graph(node_ids, payload.edges) if node_ids else num_edges == 0
    )

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }

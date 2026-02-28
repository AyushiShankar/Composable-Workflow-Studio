import { useState } from 'react';
import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      alert(
        `Pipeline analysis complete.\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${
          result.is_dag ? 'Yes' : 'No'
        }`
      );
    } catch (error) {
      alert(`Unable to parse pipeline right now. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-row">
      <button className="submit-button" type="button" disabled={isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};

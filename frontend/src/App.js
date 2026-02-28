import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Vector Pipeline Builder</p>
          <h1>Composable Workflow Studio</h1>
        </div>
      </header>

      <main className="app-main">
        <PipelineToolbar />
        <section className="canvas-panel">
          <PipelineUI />
          <SubmitButton />
        </section>
      </main>
    </div>
  );
}

export default App;

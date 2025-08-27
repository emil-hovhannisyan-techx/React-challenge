import Canvas from "../components/canvas/Canvas";
import Controls from "../components/controls/Controls";
import Stats from "../components/stats/Stats";
import { useDrawing } from "../hooks/useDrawing";
import "./App.css";

function App() {
  const {
    points,
    historyCount,
    futureCount,
    addPoint,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useDrawing();

  const handleAddRandomPoint = () => {
    addPoint({
      x: Math.random() * 500 + 100,
      y: Math.random() * 300 + 50,
      id: Date.now(),
    });
  };

  return (
    <div className="app">
      <h1>Drawing App with Undo/Redo</h1>
      <p>
        Click anywhere on the canvas below to add points. Use the undo/redo
        buttons to navigate through your drawing history.
      </p>

      <Controls
        onAddPoint={handleAddRandomPoint}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        undoCount={historyCount - 1}
        redoCount={futureCount}
      />

      <Canvas points={points} onAddPoint={addPoint} />

      <Stats
        pointsCount={points.length}
        historyCount={historyCount}
        futureCount={futureCount}
      />
    </div>
  );
}

export default App;

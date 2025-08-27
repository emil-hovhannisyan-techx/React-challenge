import type { ControlsProps } from "../../types";

function Controls({
  onAddPoint,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  undoCount,
  redoCount,
}: ControlsProps & { undoCount: number; redoCount: number }) {
  return (
    <div className="controls">
      <button className="add-btn" onClick={onAddPoint}>
        Add Random Point
      </button>

      <div className="undo-redo-container">
        <button className="undo-btn" onClick={onUndo} disabled={!canUndo}>
          Undo ({undoCount})
        </button>
        <button className="redo-btn" onClick={onRedo} disabled={!canRedo}>
          Redo ({redoCount})
        </button>
      </div>
    </div>
  );
}

export default Controls;

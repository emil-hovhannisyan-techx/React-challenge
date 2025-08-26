import type { CanvasProps } from "../types";
import Point from "./Point";

function Canvas({ points, onAddPoint }: CanvasProps) {
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onAddPoint({ x, y, id: Date.now() });
  };

  return (
    <div className="canvas" onClick={handleCanvasClick}>
      {points.length === 0 && <div>Click anywhere to add a point</div>}
      {points.map((point) => (
        <Point key={point.id} point={point} />
      ))}
    </div>
  );
}

export default Canvas;

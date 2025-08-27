import type { PointProps } from "../../types";

function Point({ point }: PointProps) {
  return (
    <div
      className="point"
      data-testid={`point-${point.id}`}
      style={{
        left: `${point.x}px`,
        top: `${point.y}px`,
        backgroundColor: point.color,
      }}
    />
  );
}

export default Point;

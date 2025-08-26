export interface Point {
  x: number;
  y: number;
  id: number;
  color: string;
}

export interface DrawingState {
  history: Point[][];
  future: Point[][];
}

export type DrawingAction =
  | { type: "ADD_POINT"; point: Point }
  | { type: "UNDO" }
  | { type: "REDO" };

export interface ControlsProps {
  onAddPoint: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
  redoCount: number;
}

export interface CanvasProps {
  points: Point[];
  onAddPoint: (point: Omit<Point, "color">) => void;
}

export interface PointProps {
  point: Point;
}

export interface StatsProps {
  pointsCount: number;
  historyCount: number;
  futureCount: number;
}

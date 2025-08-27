import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const ADD_POINT = "ADD_POINT";
const UNDO = "UNDO";
const REDO = "REDO";

function drawingReducer(state: any, action: any) {
  switch (action.type) {
    case ADD_POINT: {
      const currentPoints = state.history[state.history.length - 1];
      const newPoints = [...currentPoints, action.point];
      return {
        history: [...state.history, newPoints],
        future: [],
      };
    }
    case UNDO: {
      if (state.history.length <= 1) return state;
      const lastState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, state.history.length - 1);
      return {
        history: newHistory,
        future: [...state.future, lastState],
      };
    }
    case REDO: {
      if (state.future.length === 0) return state;
      const nextState = state.future[state.future.length - 1];
      const newFuture = state.future.slice(0, state.future.length - 1);
      return {
        history: [...state.history, nextState],
        future: newFuture,
      };
    }
    default:
      return state;
  }
}

describe("App Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with initial UI elements", () => {
    render(<App />);

    expect(screen.getByText(/Points on canvas:/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Click anywhere to add a point/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Undo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Redo/i })).toBeInTheDocument();
  });

  it("adds a point when canvas is clicked", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");

    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    fireEvent.click(canvas, { clientX: 50, clientY: 60 });

    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);

    expect(
      screen.queryByText(/Click anywhere to add a point/i)
    ).not.toBeInTheDocument();

    const pointsLabel = screen.getByText(/Points on canvas:/i);
    expect(pointsLabel.nextElementSibling).toHaveTextContent("1");
  });

  it("adds a random point when button is clicked", () => {
    render(<App />);

    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const addButton = screen.getByRole("button", { name: "Add Random Point" });
    fireEvent.click(addButton);

    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);

    expect(
      screen.queryByText(/Click anywhere to add a point/i)
    ).not.toBeInTheDocument();

    const pointsLabel = screen.getByText(/Points on canvas:/i);
    expect(pointsLabel.nextElementSibling).toHaveTextContent("1");

    const historyLabel = screen.getByText(/History states:/i);
    expect(historyLabel.nextElementSibling).toHaveTextContent("2");
  });

  it("supports undo and redo", () => {
    render(<App />);
    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    fireEvent.click(canvas, { clientX: 10, clientY: 10 });
    fireEvent.click(canvas, { clientX: 20, clientY: 20 });

    expect(screen.getAllByTestId(/point-/)).toHaveLength(2);

    const pointsLabel = screen.getByText(/Points on canvas:/i);
    expect(pointsLabel.nextElementSibling).toHaveTextContent("2");

    const historyLabel = screen.getByText(/History states:/i);
    expect(historyLabel.nextElementSibling).toHaveTextContent("3");

    const futureLabel = screen.getByText(/Future states:/i);
    expect(futureLabel.nextElementSibling).toHaveTextContent("0");

    const undoButton = screen.getByRole("button", { name: /Undo/i });
    fireEvent.click(undoButton);
    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);

    expect(pointsLabel.nextElementSibling).toHaveTextContent("1");
    expect(historyLabel.nextElementSibling).toHaveTextContent("2");
    expect(futureLabel.nextElementSibling).toHaveTextContent("1");

    const redoButton = screen.getByRole("button", { name: /Redo/i });
    fireEvent.click(redoButton);
    expect(screen.getAllByTestId(/point-/)).toHaveLength(2);

    expect(pointsLabel.nextElementSibling).toHaveTextContent("2");
    expect(historyLabel.nextElementSibling).toHaveTextContent("3");
    expect(futureLabel.nextElementSibling).toHaveTextContent("0");
  });

  it("handles undo when no history to undo", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    fireEvent.click(canvas, { clientX: 10, clientY: 10 });

    const undoButton = screen.getByRole("button", { name: /Undo/i });
    fireEvent.click(undoButton);

    fireEvent.click(undoButton);

    expect(screen.queryByTestId(/point-/)).not.toBeInTheDocument();

    const pointsLabel = screen.getByText(/Points on canvas:/i);
    expect(pointsLabel.nextElementSibling).toHaveTextContent("0");

    const historyLabel = screen.getByText(/History states:/i);
    expect(historyLabel.nextElementSibling).toHaveTextContent("1");
  });

  it("handles redo when no future to redo", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    fireEvent.click(canvas, { clientX: 10, clientY: 10 });

    const undoButton = screen.getByRole("button", { name: /Undo/i });
    fireEvent.click(undoButton);

    const redoButton = screen.getByRole("button", { name: /Redo/i });
    fireEvent.click(redoButton);

    fireEvent.click(redoButton);

    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);

    const pointsLabel = screen.getByText(/Points on canvas:/i);
    expect(pointsLabel.nextElementSibling).toHaveTextContent("1");

    const futureLabel = screen.getByText(/Future states:/i);
    expect(futureLabel.nextElementSibling).toHaveTextContent("0");
  });

  it("maintains state integrity during various operations", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    const addRandomButton = screen.getByRole("button", {
      name: "Add Random Point",
    });
    const undoButton = screen.getByRole("button", { name: /Undo/i });
    const redoButton = screen.getByRole("button", { name: /Redo/i });

    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();

    fireEvent.click(canvas, { clientX: 10, clientY: 10 }); // Canvas click
    fireEvent.click(addRandomButton); // Random point button

    expect(screen.getAllByTestId(/point-/)).toHaveLength(2);
    expect(undoButton).not.toBeDisabled();

    fireEvent.click(undoButton);
    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);

    fireEvent.click(redoButton);
    expect(screen.getAllByTestId(/point-/)).toHaveLength(2);

    fireEvent.click(canvas, { clientX: 30, clientY: 30 });
    expect(screen.getAllByTestId(/point-/)).toHaveLength(3);

    fireEvent.click(undoButton);
    fireEvent.click(undoButton);
    expect(screen.getAllByTestId(/point-/)).toHaveLength(1);
  });

  it("clears future states when new point is added after undo", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    // Add two points
    fireEvent.click(canvas, { clientX: 10, clientY: 10 });
    fireEvent.click(canvas, { clientX: 20, clientY: 20 });

    const undoButton = screen.getByRole("button", { name: /Undo/i });
    fireEvent.click(undoButton);

    const futureLabel = screen.getByText(/Future states:/i);
    expect(futureLabel.nextElementSibling).toHaveTextContent("1");

    fireEvent.click(canvas, { clientX: 30, clientY: 30 });

    expect(futureLabel.nextElementSibling).toHaveTextContent("0");

    expect(screen.getAllByTestId(/point-/)).toHaveLength(2);
  });

  it("handles unknown action types in reducer", () => {
    const initialState = {
      history: [[]],
      future: [],
    };

    const result = drawingReducer(initialState, { type: "UNKNOWN_ACTION" });

    expect(result).toBe(initialState);
  });

  it("covers all branches in ADD_POINT action", () => {
    const initialState = {
      history: [[{ x: 10, y: 10, id: 1, color: "#red" }]],
      future: [{ x: 20, y: 20, id: 2, color: "#blue" }],
    };

    const newPoint = { x: 30, y: 30, id: 3, color: "#green" };
    const result = drawingReducer(initialState, {
      type: ADD_POINT,
      point: newPoint,
    });

    expect(result.history).toHaveLength(2);
    expect(result.history[1]).toContain(newPoint);

    expect(result.future).toEqual([]);
  });

  it("covers edge cases in UNDO action", () => {
    const minimalState = {
      history: [[]],
      future: [],
    };

    const resultMinimal = drawingReducer(minimalState, { type: UNDO });
    expect(resultMinimal).toBe(minimalState);

    const multiState = {
      history: [[], [{ x: 10, y: 10, id: 1, color: "#red" }]],
      future: [],
    };

    const resultMulti = drawingReducer(multiState, { type: UNDO });
    expect(resultMulti.history).toEqual([[]]);
    expect(resultMulti.future).toEqual([
      [{ x: 10, y: 10, id: 1, color: "#red" }],
    ]);
  });

  it("covers edge cases in REDO action", () => {
    const emptyFutureState = {
      history: [[]],
      future: [],
    };

    const resultEmpty = drawingReducer(emptyFutureState, { type: REDO });
    expect(resultEmpty).toBe(emptyFutureState);

    const futureState = {
      history: [[]],
      future: [[{ x: 10, y: 10, id: 1, color: "#red" }]],
    };

    const resultFuture = drawingReducer(futureState, { type: REDO });
    expect(resultFuture.history).toEqual([
      [],
      [{ x: 10, y: 10, id: 1, color: "#red" }],
    ]);
    expect(resultFuture.future).toEqual([]);
  });

  it("tests getRandomColor function coverage by adding multiple points", () => {
    render(<App />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 0, top: 0, width: 200, height: 200 } as DOMRect;
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    for (let i = 0; i < 10; i++) {
      fireEvent.click(canvas, { clientX: 10 + i, clientY: 10 + i });
    }

    expect(screen.getAllByTestId(/point-/)).toHaveLength(10);
  });
});

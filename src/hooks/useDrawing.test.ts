import { renderHook, act } from "@testing-library/react";
import { useDrawing } from "./useDrawing";
import { drawingReducer, ADD_POINT, UNDO, REDO } from "./useDrawing";
import { describe, it, expect } from "vitest";

describe("useDrawing hook", () => {
  it("should initialize with empty points and correct counts", () => {
    const { result } = renderHook(() => useDrawing());

    expect(result.current.points).toEqual([]);
    expect(result.current.historyCount).toBe(1);
    expect(result.current.futureCount).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });
  it("should handle ADD_POINT action without point property (covers lines 285-286)", () => {
    const initialState = {
      history: [[]],
      future: [],
    };

    const action = { type: ADD_POINT } as any;
    const result = drawingReducer(initialState, action);

    expect(result).toBe(initialState);
  });
  it("should handle UNDO action when history length is 1 (covers line 306)", () => {
    const initialState = {
      history: [[]],
      future: [],
    };

    const result = drawingReducer(initialState, { type: UNDO });

    expect(result).toBe(initialState);
  });

  it("should handle REDO action when future is empty", () => {
    const initialState = {
      history: [[]],
      future: [], // Empty future
    };

    const result = drawingReducer(initialState, { type: REDO });

    expect(result).toBe(initialState); // Should return unchanged state
  });

  it("should add a point with a random color", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
    });

    expect(result.current.points).toHaveLength(1);
    expect(result.current.points[0]).toEqual({
      x: 10,
      y: 20,
      id: 1,
      color: expect.any(String),
    });
    expect(result.current.historyCount).toBe(2);
    expect(result.current.futureCount).toBe(0);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it("should handle undo operation", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.addPoint({ x: 30, y: 40, id: 2 });
    });

    act(() => {
      result.current.undo();
    });

    expect(result.current.points).toHaveLength(1);
    expect(result.current.historyCount).toBe(2);
    expect(result.current.futureCount).toBe(1);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);
  });

  it("should handle redo operation", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.addPoint({ x: 30, y: 40, id: 2 });
      result.current.undo();
    });

    act(() => {
      result.current.redo();
    });

    expect(result.current.points).toHaveLength(2);
    expect(result.current.historyCount).toBe(3);
    expect(result.current.futureCount).toBe(0);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it("should not undo when history has only initial state", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.undo();
    });

    expect(result.current.points).toEqual([]);
    expect(result.current.historyCount).toBe(1);
    expect(result.current.futureCount).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it("should not redo when future is empty", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.redo();
    });

    expect(result.current.points).toHaveLength(1);
    expect(result.current.historyCount).toBe(2);
    expect(result.current.futureCount).toBe(0);
    expect(result.current.canRedo).toBe(false);
  });

  it("should clear future when adding a new point after undo", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.addPoint({ x: 30, y: 40, id: 2 });
      result.current.undo();
    });

    expect(result.current.futureCount).toBe(1);

    act(() => {
      result.current.addPoint({ x: 50, y: 60, id: 3 });
    });

    expect(result.current.points).toHaveLength(2);
    expect(result.current.historyCount).toBe(3);
    expect(result.current.futureCount).toBe(0);
  });

  it("should generate different colors for different points", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.addPoint({ x: 30, y: 40, id: 2 });
    });

    const [point1, point2] = result.current.points;
    expect(point1.color).not.toBe(point2.color);
  });

  it("should handle multiple undo and redo operations", () => {
    const { result } = renderHook(() => useDrawing());

    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.addPoint({ x: 30, y: 40, id: 2 });
      result.current.addPoint({ x: 50, y: 60, id: 3 });
    });

    act(() => {
      result.current.undo();
      result.current.undo();
    });

    expect(result.current.points).toHaveLength(1);
    expect(result.current.futureCount).toBe(2);

    act(() => {
      result.current.redo();
    });

    expect(result.current.points).toHaveLength(2);
    expect(result.current.futureCount).toBe(1);
  });
  it("should handle ADD_POINT action with point property check (covers lines 285-286)", () => {
    const { result } = renderHook(() => useDrawing());

    // This covers the "point" in action check in the reducer
    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
    });

    expect(result.current.points).toHaveLength(1);
  });

  it("should handle UNDO action when history length is 1 (covers line 306)", () => {
    const { result } = renderHook(() => useDrawing());

    // Initial state has history length 1, so undo should do nothing
    // This covers the if (state.history.length <= 1) return state; line
    act(() => {
      result.current.undo();
    });

    expect(result.current.points).toEqual([]);
    expect(result.current.historyCount).toBe(1);
  });

  it("should handle REDO action when future is empty (covers similar pattern)", () => {
    const { result } = renderHook(() => useDrawing());

    // Add a point but don't undo, so future is empty
    // This covers the if (state.future.length === 0) return state; line
    act(() => {
      result.current.addPoint({ x: 10, y: 20, id: 1 });
      result.current.redo(); // Should do nothing since future is empty
    });

    expect(result.current.points).toHaveLength(1);
    expect(result.current.futureCount).toBe(0);
  });
  it("should handle unknown action types", () => {
    const initialState = {
      history: [[]],
      future: [],
    };

    const result = drawingReducer(initialState, {
      type: "UNKNOWN_ACTION",
    } as any);

    expect(result).toBe(initialState); // Should return unchanged state
  });
});

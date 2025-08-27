import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Canvas from "./Canvas";

describe("Canvas Component", () => {
  const mockAddPoint = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows instruction text when no points are present", () => {
    render(<Canvas points={[]} onAddPoint={mockAddPoint} />);
    expect(
      screen.getByText(/Click anywhere to add a point/i)
    ).toBeInTheDocument();
  });

  it("renders points when provided", () => {
    const points = [
      { id: 1, x: 50, y: 50, color: "blue" },
      { id: 2, x: 100, y: 100, color: "red" },
    ];
    render(<Canvas points={points} onAddPoint={mockAddPoint} />);

    // should render two Point components
    expect(screen.getAllByTestId(/point/i)).toHaveLength(2);
  });

  it("calls onAddPoint with correct coordinates when clicked", () => {
    render(<Canvas points={[]} onAddPoint={mockAddPoint} />);

    const canvas = screen.getByTestId("canvas");
    const rect = { left: 10, top: 20, width: 200, height: 200 } as DOMRect;

    // mock getBoundingClientRect
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue(rect);

    fireEvent.click(canvas, { clientX: 60, clientY: 80 });

    expect(mockAddPoint).toHaveBeenCalledTimes(1);

    const callArg = mockAddPoint.mock.calls[0][0];
    expect(callArg.x).toBe(50); // 60 - left(10)
    expect(callArg.y).toBe(60); // 80 - top(20)
    expect(callArg.id).toEqual(expect.any(Number));
  });
});

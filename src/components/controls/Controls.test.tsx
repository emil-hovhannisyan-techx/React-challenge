import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Controls from "./Controls";

describe("Controls Component", () => {
  // mocks
  const mockAdd = vi.fn();
  const mockUndo = vi.fn();
  const mockRedo = vi.fn();

  const setup = (props = {}) =>
    render(
      <Controls
        onAddPoint={mockAdd}
        onUndo={mockUndo}
        onRedo={mockRedo}
        canUndo={true}
        canRedo={true}
        undoCount={2}
        redoCount={3}
        {...props}
      />
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all buttons with correct labels and counts", () => {
    setup();

    expect(screen.getByText("Add Random Point")).toBeInTheDocument();
    expect(screen.getByText(/Undo \(2\)/)).toBeInTheDocument();
    expect(screen.getByText(/Redo \(3\)/)).toBeInTheDocument();
  });

  it("calls onAddPoint when 'Add Random Point' is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Add Random Point"));
    expect(mockAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onRedo when 'Redo' is clicked", () => {
    setup();
    fireEvent.click(screen.getByText(/Redo/));
    expect(mockRedo).toHaveBeenCalledTimes(1);
  });

  it("disables Undo button when canUndo is false", () => {
    setup({ canUndo: false });
    expect(screen.getByText(/Undo/)).toBeDisabled();
  });

  it("disables Redo button when canRedo is false", () => {
    setup({ canRedo: false });
    expect(screen.getByText(/Redo/)).toBeDisabled();
  });
});

import { render, screen } from "@testing-library/react";
import Stats from "./Stats";
import { describe, it, expect } from "vitest";

describe("Stats Component", () => {
  it("renders all labels correctly", () => {
    render(<Stats pointsCount={0} historyCount={0} futureCount={0} />);

    expect(screen.getByText(/Points on canvas:/i)).toBeInTheDocument();
    expect(screen.getByText(/History states:/i)).toBeInTheDocument();
    expect(screen.getByText(/Future states:/i)).toBeInTheDocument();
  });

  it("renders values correctly based on props", () => {
    render(<Stats pointsCount={5} historyCount={3} futureCount={2} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("updates values when props change", () => {
    const { rerender } = render(
      <Stats pointsCount={1} historyCount={2} futureCount={3} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    rerender(<Stats pointsCount={10} historyCount={20} futureCount={30} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});

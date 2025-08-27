import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Point from "./Point";
import type { Point as PointType } from "../../types";

describe("Point", () => {
  // Mock point data
  const mockPoint: PointType = {
    id: 1,
    x: 100,
    y: 200,
    color: "#ff5733",
  };

  const mockPointWithDifferentColor: PointType = {
    id: 2,
    x: 150,
    y: 250,
    color: "#33ff57",
  };

  const mockPointWithZeroCoordinates: PointType = {
    id: 3,
    x: 0,
    y: 0,
    color: "#3357ff",
  };

  const mockPointWithLargeCoordinates: PointType = {
    id: 4,
    x: 9999,
    y: 8888,
    color: "#ff33a6",
  };

  const mockPointWithHexColor: PointType = {
    id: 5,
    x: 300,
    y: 400,
    color: "#abc123",
  };

  const mockPointWithRGBColor: PointType = {
    id: 6,
    x: 500,
    y: 600,
    color: "rgb(255, 128, 64)",
  };

  const mockPointWithNamedColor: PointType = {
    id: 7,
    x: 700,
    y: 800,
    color: "red",
  };

  const mockPointWithNegativeCoordinates: PointType = {
    id: 8,
    x: -50,
    y: -100,
    color: "#000000",
  };

  const mockPointWithDecimalCoordinates: PointType = {
    id: 9,
    x: 123.45,
    y: 678.9,
    color: "#ffffff",
  };

  const mockPointWithTransparentColor: PointType = {
    id: 10,
    x: 100,
    y: 100,
    color: "transparent",
  };

  const mockEmptyPoint: PointType = {
    id: 11,
    x: 0,
    y: 0,
    color: "",
  };

  it("renders with correct position and color styles", () => {
    render(<Point point={mockPoint} />);

    const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "100px",
      top: "200px",
      backgroundColor: "#ff5733",
    });
  });

  it("has the correct CSS class", () => {
    render(<Point point={mockPoint} />);

    const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
    expect(pointElement).toHaveClass("point");
  });

  it("renders with different color values", () => {
    render(<Point point={mockPointWithDifferentColor} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithDifferentColor.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "150px",
      top: "250px",
      backgroundColor: "#33ff57",
    });
  });

  it("handles zero coordinates correctly", () => {
    render(<Point point={mockPointWithZeroCoordinates} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithZeroCoordinates.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "0px",
      top: "0px",
      backgroundColor: "#3357ff",
    });
  });

  it("handles large coordinates correctly", () => {
    render(<Point point={mockPointWithLargeCoordinates} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithLargeCoordinates.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "9999px",
      top: "8888px",
      backgroundColor: "#ff33a6",
    });
  });

  it("handles different color formats - hex", () => {
    render(<Point point={mockPointWithHexColor} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithHexColor.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "300px",
      top: "400px",
      backgroundColor: "#abc123",
    });
  });

  it("handles different color formats - rgb", () => {
    render(<Point point={mockPointWithRGBColor} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithRGBColor.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "500px",
      top: "600px",
      backgroundColor: "rgb(255, 128, 64)",
    });
  });

  it("handles different color formats - named color", () => {
    render(<Point point={mockPointWithNamedColor} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithNamedColor.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "700px",
      top: "800px",
      backgroundColor: "rgb(255, 0, 0)",
    });
  });

  it("renders without crashing when point has empty color", () => {
    render(<Point point={mockEmptyPoint} />);

    const pointElement = screen.getByTestId(`point-${mockEmptyPoint.id}`);
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "0px",
      top: "0px",
      backgroundColor: "",
    });
  });

  it("applies inline styles correctly", () => {
    render(<Point point={mockPoint} />);

    const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
    const styles = window.getComputedStyle(pointElement);

    expect(styles.left).toBe("100px");
    expect(styles.top).toBe("200px");
    expect(styles.backgroundColor).toBe("rgb(255, 87, 51)"); // #ff5733 in rgb
  });

  it("has no children elements", () => {
    render(<Point point={mockPoint} />);

    const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
    expect(pointElement.children.length).toBe(0);
  });

  it("has no text content", () => {
    render(<Point point={mockPoint} />);

    const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
    expect(pointElement.textContent).toBe("");
  });

  it("handles negative coordinates", () => {
    render(<Point point={mockPointWithNegativeCoordinates} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithNegativeCoordinates.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "-50px",
      top: "-100px",
      backgroundColor: "#000000",
    });
  });

  it("handles decimal coordinates", () => {
    render(<Point point={mockPointWithDecimalCoordinates} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithDecimalCoordinates.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "123.45px",
      top: "678.9px",
      backgroundColor: "#ffffff",
    });
  });

  it("handles transparent color", () => {
    render(<Point point={mockPointWithTransparentColor} />);

    const pointElement = screen.getByTestId(
      `point-${mockPointWithTransparentColor.id}`
    );
    expect(pointElement).toBeInTheDocument();
    expect(pointElement).toHaveStyle({
      left: "100px",
      top: "100px",
      backgroundColor: "rgba(0, 0, 0, 0)",
    });
  });

  it("matches snapshot with basic point data", () => {
    const { container } = render(<Point point={mockPoint} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with complex point data", () => {
    const { container } = render(<Point point={mockPointWithRGBColor} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with negative coordinates", () => {
    const { container } = render(
      <Point point={mockPointWithNegativeCoordinates} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("Accessibility and DOM attributes", () => {
    it("has no aria-label or specific role", () => {
      render(<Point point={mockPoint} />);

      const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
      expect(pointElement).not.toHaveAttribute("aria-label");
      expect(pointElement.getAttribute("role")).toBeNull();
    });

    it("has no tabindex", () => {
      render(<Point point={mockPoint} />);

      const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
      expect(pointElement).not.toHaveAttribute("tabindex");
    });

    it("is not focusable", () => {
      render(<Point point={mockPoint} />);

      const pointElement = screen.getByTestId(`point-${mockPoint.id}`);
      expect(pointElement.tabIndex).toBe(-1);
    });
  });

  describe("Edge cases", () => {
    it("handles extremely large coordinates", () => {
      const largePoint: PointType = {
        id: 999,
        x: 999999,
        y: 888888,
        color: "#123456",
      };

      render(<Point point={largePoint} />);

      const pointElement = screen.getByTestId(`point-${largePoint.id}`);
      expect(pointElement).toBeInTheDocument();
      expect(pointElement).toHaveStyle({
        left: "999999px",
        top: "888888px",
      });
    });

    it("handles very small decimal coordinates", () => {
      const smallPoint: PointType = {
        id: 888,
        x: 0.0001,
        y: 0.0002,
        color: "#654321",
      };

      render(<Point point={smallPoint} />);

      const pointElement = screen.getByTestId(`point-${smallPoint.id}`);
      expect(pointElement).toBeInTheDocument();
      expect(pointElement).toHaveStyle({
        left: "0.0001px",
        top: "0.0002px",
      });
    });
  });
});

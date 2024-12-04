import { render, screen, fireEvent } from "@testing-library/react";
import StatusToggle from "./StatusToggle";

const mockOnToggle = jest.fn();

describe("StatusToggle", () => {
  it("renders the toggle with the correct initial state", () => {
    render(<StatusToggle isActive={true} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("renders the circle", () => {
    render(<StatusToggle isActive={true} onToggle={mockOnToggle} />);

    const circle = screen.getByTestId("checkbox-circle");

    expect(circle).toBeInTheDocument();
  });

  it("renders the green color when isActive is true", () => {
    render(<StatusToggle isActive={true} onToggle={mockOnToggle} />);

    const circle = screen.getByTestId("checkbox-circle");

    expect(circle).toHaveClass("bg-green-500");
  });

  it("renders the gray color when isActive is false", () => {
    render(<StatusToggle isActive={false} onToggle={mockOnToggle} />);

    const circle = screen.getByTestId("checkbox-circle");

    expect(circle).toHaveClass("bg-gray-300");
  });

  it("renders the dot to left when isActive is true", () => {
    render(<StatusToggle isActive={true} onToggle={mockOnToggle} />);

    const dot = screen.getByTestId("checkbox-dot");

    expect(dot).toHaveClass("translate-x-5");
  });

  it("renders the dot to right when isActive is false", () => {
    render(<StatusToggle isActive={false} onToggle={mockOnToggle} />);

    const dot = screen.getByTestId("checkbox-dot");

    expect(dot).toHaveClass("translate-x-0");
  });

  it("calls onToggle when clicked", () => {
    render(<StatusToggle isActive={false} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});

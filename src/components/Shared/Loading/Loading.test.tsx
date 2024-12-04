import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders the loader with fullscreen dimensions when `fullscreen` is true", () => {
    render(<Loading fullscreen={true} />);

    const loaderContainer = screen.getByTestId("loading-container");
    const loaderSpinner = screen.getByTestId("loading-spinner");

    expect(loaderContainer).toHaveClass(
      "w-full h-full top-0 left-0 flex items-center justify-center z-50"
    );

    expect(loaderSpinner).toHaveClass("h-16 w-16");
  });

  it("renders the loader with non-fullscreen dimensions when `fullscreen` is false", () => {
    render(<Loading fullscreen={false} />);

    const loaderContainer = screen.getByTestId("loading-container");
    const loaderSpinner = screen.getByTestId("loading-spinner");

    expect(loaderContainer).toHaveClass(
      "w-[calc(100vw-256px)] h-[calc(100vh-64px)] bottom-0 right-0 flex items-center justify-center z-50"
    );

    expect(loaderSpinner).toHaveClass("h-8 w-8");
  });

  it("applies correct animation styles to the spinner", () => {
    render(<Loading fullscreen={true} />);

    const loaderSpinner = screen.getByTestId("loading-spinner");

    expect(loaderSpinner).toHaveClass(
      "border-t-4 border-b-4 border-gray-300 border-t-purple-500 border-b-purple-500 rounded-full animate-spin"
    );
  });
});

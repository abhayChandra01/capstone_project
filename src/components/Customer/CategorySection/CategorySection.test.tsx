import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppProvider } from "../../../context/AppProvider";
import CategorySection from "./CategorySection";

jest.mock("framer-motion", () => ({
  motion: (props: any) => <div {...props}>{props.children}</div>,
}));

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

const Provider = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("CategorySection", () => {
  it("should render the category section divs", () => {
    render(<CategorySection />, { wrapper: Provider });

    const categorySectionDesktop = screen.getByTestId("categorySectionDesktop");
    expect(categorySectionDesktop).toBeVisible();

    const categorySectionMobile = screen.getByTestId("categorySectionMobile");
    expect(categorySectionMobile).toBeVisible();
  });

  it("should make the category mobile section visible for smaller screens", () => {
    window.innerWidth = 500;
    render(<CategorySection />, { wrapper: Provider });
    const exploreButton = screen.getByText(/Explore/i);
    expect(exploreButton).toBeInTheDocument();
  });

  it("should make the category desktop section visible on click", () => {
    window.innerWidth = 1920;
    render(<CategorySection />, { wrapper: Provider });

    const categorySectionDesktop = screen.getByTestId("categorySectionDesktop");
    expect(categorySectionDesktop).toBeVisible();
  });

  it("should hide mobile category section on click", () => {
    render(<CategorySection />, { wrapper: Provider });

    const categorySectionMobile = screen.getByTestId("categorySectionMobile");
    expect(categorySectionMobile).toBeVisible();

    const exploreButton = screen.getByText("Explore");
    exploreButton.click();

    expect(categorySectionMobile).toBeVisible();
  });
});

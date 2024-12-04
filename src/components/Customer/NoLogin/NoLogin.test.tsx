import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NoLogin from "./NoLogin";
import { AppProvider } from "../../../context/AppProvider";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("No login component", () => {
  it("Component render check", () => {
    render(<NoLogin />, { wrapper: Provider });

    const firstText = screen.getByText(/You/i);
    const lastText = screen.getByText("Sign up");

    expect(firstText).toBeInTheDocument();
    expect(lastText).toBeInTheDocument();
  });

  it("First image render check", () => {
    render(<NoLogin />, { wrapper: Provider });

    const firstBanner = screen.getByAltText("NoLogin");
    expect(firstBanner).toBeInTheDocument();
    expect(firstBanner).toHaveAttribute(
      "src",
      "https://static.vecteezy.com/system/resources/thumbnails/019/872/884/small/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png"
    );
  });

  it("Descriptive text render check", () => {
    render(<NoLogin />, { wrapper: Provider });

    const text = screen.getByText(
      "You are not logged in. Please log in to access this page."
    );
    expect(text).toBeInTheDocument();
  });

  it("Login button check", () => {
    render(<NoLogin />, { wrapper: Provider });

    const loginButton = screen.getByRole("button", { name: "Log in" });
    const clickEvent = fireEvent.click(loginButton);

    expect(clickEvent).toBe(true);
  });

  it("Sign up button check", () => {
    render(<NoLogin />, { wrapper: Provider });

    const signUpButton = screen.getByRole("button", { name: "Sign up" });
    const clickEvent = fireEvent.click(signUpButton);

    expect(clickEvent).toBe(true);
  });
});

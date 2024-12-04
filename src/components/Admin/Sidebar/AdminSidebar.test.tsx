import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminProvider";
import Sidebar from "./AdminSidebar";
import useAdminDetails from "../../../hooks/useAdminDetails";

jest.mock("../../../hooks/useAdminDetails");
jest.mock("../../../context/AdminProvider");
jest.mock("../../../utils/config/navConfig", () => ({
  navConfig: {
    Admin: [
      { label: "Products", path: "/admin/products" },
      { label: "Categories", path: "/admin/categories" },
      { label: "Vendors", path: "/admin/vendors" },
    ],
  },
}));

describe("Sidebar", () => {
  it("renders sidebar header", () => {
    (useAdminDetails as jest.Mock).mockReturnValue({
      role: "Admin",
    });

    (useAdminContext as jest.Mock).mockReturnValue({
      logoutHandler: jest.fn(),
    });

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(screen.getByText(/menu/i)).toBeInTheDocument();
  });

  it("renders Sidebar with navigation items and logout", () => {
    (useAdminDetails as jest.Mock).mockReturnValue({
      role: "Admin",
    });

    (useAdminContext as jest.Mock).mockReturnValue({
      logoutHandler: jest.fn(),
    });

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const navItems = [
      { label: "Products", path: "/admin/products" },
      { label: "Categories", path: "/admin/categories" },
      { label: "Vendors", path: "/admin/vendors" },
    ];
    navItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import AdminHeader from "./AdminHeader";
import useAdminDetails from "../../../hooks/useAdminDetails";

jest.mock("../../../hooks/useAdminDetails");

describe("AdminHeader", () => {
  it("renders Admin header with role", () => {
    (useAdminDetails as jest.Mock).mockReturnValue({
      role: "Admin",
    });

    render(<AdminHeader />);

    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });

  it("renders Vendor header with role", () => {
    (useAdminDetails as jest.Mock).mockReturnValue({
      role: "Vendor",
    });

    render(<AdminHeader />);

    expect(screen.getByText(/vendor dashboard/i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import BannerSection from "./BannerSection";

describe("BannerSection Component", () => {
  it("first banner check", () => {
    render(<BannerSection />);

    const firstBanner = screen.getByAltText("first-banner");
    expect(firstBanner).toBeInTheDocument();
    expect(firstBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2024/Shaya/11-Nov/Responsive/27/Responsive-05.jpg"
    );
  });

  it("second banner check", () => {
    render(<BannerSection />);

    const secondBanner = screen.getByAltText("second-banner");
    expect(secondBanner).toBeInTheDocument();
    expect(secondBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Solitaire/02/2X.webp"
    );
  });

  it("third banner check", () => {
    render(<BannerSection />);

    const thirdBanner = screen.getByAltText("third-banner");
    expect(thirdBanner).toBeInTheDocument();
    expect(thirdBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2023/CL/09_NOV/CityBanner/2XCityBannerAgraMGRoad.jpg"
    );
  });

  it("renders all images with correct alt texts", () => {
    render(<BannerSection />);

    const firstBanner = screen.getByAltText("first-banner");
    expect(firstBanner).toBeInTheDocument();
    expect(firstBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2024/Shaya/11-Nov/Responsive/27/Responsive-05.jpg"
    );

    const secondBanner = screen.getByAltText("second-banner");
    expect(secondBanner).toBeInTheDocument();
    expect(secondBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Solitaire/02/2X.webp"
    );

    const thirdBanner = screen.getByAltText("third-banner");
    expect(thirdBanner).toBeInTheDocument();
    expect(thirdBanner).toHaveAttribute(
      "src",
      "https://cdn.caratlane.com/media/static/images/V4/2023/CL/09_NOV/CityBanner/2XCityBannerAgraMGRoad.jpg"
    );
  });
});

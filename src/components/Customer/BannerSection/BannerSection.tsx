import React from "react";

export default function BannerSection() {
  return (
    <div className="px-10 py-6 flex gap-10 flex-col md:flex-row">
      <img
        alt="first-banner"
        src="https://cdn.caratlane.com/media/static/images/V4/2024/Shaya/11-Nov/Responsive/27/Responsive-05.jpg"
      />
      <div className="flex flex-col gap-10">
        <img
          alt="second-banner"
          src="https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Solitaire/02/2X.webp"
        />
        <img
          alt="third-banner"
          src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/09_NOV/CityBanner/2XCityBannerAgraMGRoad.jpg"
        />
      </div>
    </div>
  );
}

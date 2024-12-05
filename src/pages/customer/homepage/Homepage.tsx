import React from "react";
import Carousel from "../../../components/Customer/Carousel/Carousel";
import BannerSection from "../../../components/Customer/BannerSection/BannerSection";
import GoldAndPlatinumRateCard from "../../../components/Customer/RateCards/GoldAndPlatinumRateCard";

export default function Homepage() {
  return (
    <div>
      <Carousel />

      <GoldAndPlatinumRateCard />

      <BannerSection />
    </div>
  );
}

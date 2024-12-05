import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRatesAPI } from "../../../services/customer/Rates.service";

const RATE_PER_OUNCE = 31.1035;

const GoldAndPlatinumRateCard = () => {
  const [goldRate, setGoldRate] = useState<number | null>(null);
  const [goldRatePerGram, setGoldRatePerGram] = useState<number | null>(null);
  const [platinumRate, setPlatinumRate] = useState<number | null>(null);
  const [platinumRatePerGram, setPlatinumRatePerGram] = useState<number | null>(
    null
  );

  const formatInr = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const fetchRatesData = async () => {
    try {
      const rates = await fetchRatesAPI();
      setGoldRate(rates.goldRate);
      setGoldRatePerGram(rates.goldRatePerGram);
      setPlatinumRate(rates.platinumRate);
      setPlatinumRatePerGram(rates.platinumRatePerGram);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  useEffect(() => {
    fetchRatesData();
  }, []);

  return (
    <div className="my-10 xl:my-20 px-6 sm:px-12 md:px-16 flex flex-wrap justify-center gap-8">
      <motion.div
        data-testid="gold-rate-card"
        className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-yellow-600 text-center">
          Gold Rate
        </h2>
        <div className="text-center mt-4">
          <p className="text-xl font-semibold text-gray-800">
            {goldRate ? formatInr(goldRate) + " / Troy Ounce" : "Loading..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            1 Troy Ounce = {RATE_PER_OUNCE} grams
          </p>
        </div>

        <div className="mt-6">
          <p className="text-center text-lg font-medium text-gray-800">
            Price per gram:
          </p>
          <p className="text-center text-xl text-gray-700 font-bold">
            {goldRatePerGram ? formatInr(goldRatePerGram) : "Loading..."}
          </p>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-600 text-center">
          <p>
            The gold rate is based on the latest market prices. A troy ounce
            (oz) is equivalent to 31.1035 grams and is the standard for precious
            metals.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">
          Platinum Rate
        </h2>
        <div className="text-center mt-4">
          <p className="text-xl font-semibold text-gray-800">
            {platinumRate
              ? formatInr(platinumRate) + " / Troy Ounce"
              : "Loading..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            1 Troy Ounce = {RATE_PER_OUNCE} grams
          </p>
        </div>

        <div className="mt-6">
          <p className="text-center text-lg font-medium text-gray-800">
            Price per gram:
          </p>
          <p className="text-center text-xl text-gray-700 font-bold">
            {platinumRatePerGram
              ? formatInr(platinumRatePerGram)
              : "Loading..."}
          </p>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-600 text-center">
          <p>
            The platinum rate is based on the latest market prices. A troy ounce
            (oz) is equivalent to 31.1035 grams.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center">
        <motion.div
          className="w-full sm:w-96 bg-gray-50 rounded-lg p-6 h-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-800 text-center">
            What is a Troy Ounce?
          </h3>
          <p className="text-sm text-gray-600 mt-2 text-center">
            A troy ounce (oz) is a unit of weight commonly used for measuring
            precious metals. It is equivalent to 31.1035 grams and is widely
            accepted in the precious metals industry.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GoldAndPlatinumRateCard;

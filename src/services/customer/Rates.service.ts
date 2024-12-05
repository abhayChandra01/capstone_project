import axios from "axios";

const GOLD_API_KEY = process.env.REACT_APP_RATES_KEY;
const GOLD_API_URL = process.env.REACT_APP_GOLD_API;

const RATE_PER_OUNCE = 31.1035;

export const fetchRatesAPI = async () => {
  try {
    const goldResponse = await axios.get(`${GOLD_API_URL}/XAU/INR`, {
      headers: {
        "x-access-token": GOLD_API_KEY,
      },
    });

    const platinumResponse = await axios.get(`${GOLD_API_URL}/XPT/INR`, {
      headers: {
        "x-access-token": GOLD_API_KEY,
      },
    });

    const goldRate = goldResponse.data.price;
    const platinumRate = platinumResponse.data.price;

    return {
      goldRate,
      goldRatePerGram: goldRate / RATE_PER_OUNCE,
      platinumRate,
      platinumRatePerGram: platinumRate / RATE_PER_OUNCE,
    };
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw new Error("Failed to fetch rates.");
  }
};

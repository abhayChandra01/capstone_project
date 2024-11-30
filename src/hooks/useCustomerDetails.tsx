import { useEffect, useState } from "react";
import { Customer } from "../model/Customer.model";
import { useAppContext } from "../context/AppProvider";

const useCustomerDetails = (): Customer | null => {
  const { isLoggedIn } = useAppContext();
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);

  const updateCustomerDetails = () => {
    try {
      const user = JSON.parse(localStorage.getItem("customer_user") || "null");
      setCustomerDetails(user || null);
    } catch (error) {
      console.error("Error parsing customer_user from localStorage:", error);
      setCustomerDetails(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      updateCustomerDetails();
    }
  }, [isLoggedIn]);

  return customerDetails;
};

export default useCustomerDetails;

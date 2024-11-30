import { useEffect, useState } from "react";
import { AdminUser } from "../model/AdminUser.model";
import { Vendor } from "../model/Vendor.model";

const useAdminDetails = (): AdminUser | null => {
  const [adminDetails, setAdminDetails] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("admin_user") || "null");
      setAdminDetails(user || null);
    } catch (error) {
      console.error("Error parsing admin_user from localStorage:", error);
      setAdminDetails(null);
    }
  }, []);

  return adminDetails;
};

export default useAdminDetails;

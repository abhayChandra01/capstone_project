import axios from "axios";
import { createVendor, Vendor } from "../../model/Vendor.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getVendorsAPI = async (): Promise<Vendor[]> => {
  const response = await axios.get<Vendor[]>(`${API_URL}/admins?role=vendor`);
  return response.data;
};

export const createVendorAPI = async (
  vendor: createVendor
): Promise<createVendor> => {
  const response = await axios.post(`${API_URL}/admins`, vendor);
  return response.data;
};

export const checkEmailExistsAPI = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/admins`, {
      params: { email },
    });
    return response.data.length > 0;
  } catch (error) {
    console.error("Error checking email existence", error);
    return false;
  }
};

export const updateVendorAPI = async (
  id: string,
  vendor: Partial<createVendor>
): Promise<createVendor> => {
  const response = await axios.put(`${API_URL}/admins/${id}`, vendor);
  return response.data;
};

export const deleteVendorAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/admins/${id}`);
};

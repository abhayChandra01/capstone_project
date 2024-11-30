import axios from "axios";
import { Customer } from "../../model/Customer.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const createCustomerAPI = async (
  customer: Customer
): Promise<Customer | null> => {
  const response = await axios.post<Customer[]>(
    `${API_URL}/customers`,
    customer
  );

  return response.data.length > 0 ? response.data[0] : null;
};

export const checkEmailExistsAPI = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/customers`, {
      params: { email },
    });
    return response.data.length > 0;
  } catch (error) {
    console.error("Error checking email existence", error);
    return false;
  }
};

export const checkPhoneExistsAPI = async (phone: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/customers`, {
      params: { phone },
    });
    return response.data.length > 0;
  } catch (error) {
    console.error("Error checking phone existence", error);
    return false;
  }
};

export const customerLoginAPI = async (
  email: string
): Promise<Customer | null> => {
  const response = await axios.get<Customer[]>(`${API_URL}/customers`, {
    params: { email },
  });
  return response.data.length > 0 ? response.data[0] : null;
};

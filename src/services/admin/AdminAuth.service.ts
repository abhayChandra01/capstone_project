import axios from "axios";
import { AdminUser } from "../../model/AdminUser.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const adminLoginAPI = async (
  email: string
): Promise<AdminUser | null> => {
  const response = await axios.get<AdminUser[]>(`${API_URL}/admins`, {
    params: { email },
  });
  return response.data.length > 0 ? response.data[0] : null;
};

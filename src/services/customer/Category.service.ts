import axios from "axios";
import { Category } from "../../model/Category.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getCategoriesAPI = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_URL}/categories`);
  return response.data;
};

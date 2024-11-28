import axios from "axios";
import { Category } from "../../model/Category.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getCategoriesAPI = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_URL}/categories`);
  return response.data;
};

export const createCategoryAPI = async (
  category: Category
): Promise<Category> => {
  const response = await axios.post(`${API_URL}/categories`, category);
  return response.data;
};

export const updateCategoryAPI = async (
  id: string,
  category: Partial<Category>
): Promise<Category> => {
  const response = await axios.put(`${API_URL}/categories/${id}`, category);
  return response.data;
};

export const deleteCategoryAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/categories/${id}`);
};

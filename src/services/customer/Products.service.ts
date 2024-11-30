import axios from "axios";
import { Product } from "../../model/Product.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getProductsAPI = async (
  subCatId?: string | null,
  catId?: string | null
): Promise<Product[]> => {
  let url = `${API_URL}/products?status=true`;

  if (subCatId) {
    url += `&sub_category_id=${subCatId}`;
  }
  if (catId) {
    url += `&category_id=${catId}`;
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
};

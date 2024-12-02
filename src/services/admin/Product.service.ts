import axios from "axios";
import { Product } from "../../model/Product.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getTotalProductsCountAPI = async (
  vendor_id: string | null
): Promise<number> => {
  const params: { [key: string]: string | null } = {};

  if (vendor_id) {
    params.vendor_id = vendor_id;
  }

  const response = await axios.get<Product[]>(`${API_URL}/products`, {
    params,
  });

  return response.data?.length || 0;
};

export const getProductsAPI = async ({
  page,
  limit,
  vendor_id,
  category_id,
  sub_category_id,
}: {
  page: number;
  limit: number;
  vendor_id?: string | null;
  category_id?: string | null;
  sub_category_id?: string | null;
}): Promise<Product[]> => {
  const params: { [key: string]: string | number } = {
    _page: page,
    _limit: limit,
  };

  if (vendor_id) {
    params.vendor_id = vendor_id;
  }

  if (category_id) {
    params.category_id = category_id;

    if (sub_category_id) {
      params.sub_category_id = sub_category_id;
    }
  }

  const response = await axios.get<Product[]>(`${API_URL}/products`, {
    params,
  });
  return response.data;
};

export const getProductByIdAPI = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProductAPI = async (product: Product): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProductAPI = async (
  id: string,
  product: Product
): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProductAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};

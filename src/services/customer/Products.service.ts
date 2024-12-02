import axios from "axios";
import { Product } from "../../model/Product.model";
import { Customer } from "../../model/Customer.model";

const API_URL = `${process.env.REACT_APP_BASE_URL}`;

export const getProductsAPI = async (
  subCatId?: string | null,
  catId?: string | null,
  selectedDiscount?: string | null,
  selectedPriceRange?: string | null
): Promise<Product[]> => {
  let url = `${API_URL}/products?status=true`;

  if (subCatId) {
    url += `&sub_category_id=${subCatId}`;
  }
  if (catId) {
    url += `&category_id=${catId}`;
  }

  if (selectedDiscount) {
    switch (selectedDiscount) {
      case "Below 10":
        url += `&discount_lte=10`;
        break;

      case "10-20":
        url += `&discount_gte=10&discount_lte=20`;
        break;

      case "Above 20":
        url += `&discount_gte=20`;
        break;

      default:
        break;
    }
  }

  if (selectedPriceRange) {
    switch (selectedPriceRange) {
      case "Below 10K":
        url += `&price_lte=10000`;
        break;

      case "10K-30K":
        url += `&price_gte=10000&price_lte=30000`;
        break;

      case "30K-70K":
        url += `&price_gte=30000&price_lte=70000`;
        break;

      case "Above 70K":
        url += `&price_gte=70000`;
        break;

      default:
        break;
    }
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
};

export const getProductByIdAPI = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response.data;
};

export const getWishlistAPI = async (): Promise<Customer> => {
  const id = JSON.parse(localStorage.getItem("customer_user") || "")?.id;

  const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
  return response.data;
};

export const addToWishlistAPI = async (
  id: string,
  wishlist: { id: string; wishlist_id: string; product_details: Product }[]
): Promise<Customer | null> => {
  try {
    const response = await axios.patch<Customer>(`${API_URL}/customers/${id}`, {
      wishlist,
    });
    return response.data || null;
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error;
  }
};

export const getCartAPI = async (): Promise<Customer> => {
  const id = JSON.parse(localStorage.getItem("customer_user") || "")?.id;

  const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
  return response.data;
};

export const addToCartAPI = async (
  id: string,
  cart: {
    id: string;
    cart_id: string;
    product_count: number;
    product_details: Product;
  }[]
): Promise<Customer | null> => {
  try {
    const response = await axios.patch<Customer>(`${API_URL}/customers/${id}`, {
      cart,
    });
    return response.data || null;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const updateCartAPI = async (customerId: string, updatedCart: any[]) => {
  const response = await axios.patch(`${API_URL}/customers/${customerId}`, {
    cart: updatedCart,
  });
  return response.data;
};

export const placeOrderAPI = async (
  customerId: string,
  updatedCart: any[],
  orders: any[]
) => {
  const response = await axios.patch(`${API_URL}/customers/${customerId}`, {
    cart: updatedCart,
    orders: orders,
  });
  return response.data;
};

export const getOrdersAPI = async (): Promise<Customer> => {
  const id = JSON.parse(localStorage.getItem("customer_user") || "")?.id;

  const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
  return response.data;
};

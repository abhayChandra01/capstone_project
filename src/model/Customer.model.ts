import { Product } from "./Product.model";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  address?:
    | {
        id: string;
        address_id: string;
        address_line: string;
        city: string;
        state: string;
        pincode: number;
      }[]
    | [];
  orders?:
    | {
        id: string;
        order_id: string;
        order_date: string;
        total_amount: number;
        products_ordered: {
          id: string;
          product_count: number;
          product_details: Product;
        }[];
      }[]
    | [];
  cart?:
    | {
        id: string;
        cart_id: string;
        product_count: number;
        product_details: Product;
      }[]
    | [];
  wishlist?:
    | {
        id: string;
        wishlist_id: string;
        product_details: Product;
      }[]
    | [];
}

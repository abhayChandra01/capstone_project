import { Category, SubCategory } from "./Category.model";
import { Vendor } from "./Vendor.model";

export interface Product {
  id: string;
  product_name: string;
  price: number;
  discount: number;
  stock: number;
  category_id: string;
  sub_category_id: string;
  vendor_id: string;
  category_details: Omit<Category, "sub_categories">;
  sub_category_details: SubCategory;
  vendor_details: Vendor;
  images: string[];
  status: boolean;
}

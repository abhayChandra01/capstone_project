export interface Category {
  id: string;
  category_id: string;
  category_name: string;
  sub_categories: SubCategory[];
}

export interface SubCategory {
  id: string;
  sub_category_id: string;
  sub_category_name: string;
  sub_category_icon: string;
}

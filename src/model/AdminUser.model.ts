export interface AdminUser {
  id: string;
  vendor_id?: string;
  name: string;
  email: string;
  role: "admin" | "vendor";
}

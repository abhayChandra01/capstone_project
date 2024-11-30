export interface Vendor {
  id: string;
  vendor_id: string;
  name: string;
  email: string;
  role: "vendor";
  password?: string;
  reset_password?: boolean;
}

export interface createVendor {
  id: string;
  vendor_id: string;
  name: string;
  email: string;
  role: "vendor";
  password?: string;
  reset_password?: boolean;
}

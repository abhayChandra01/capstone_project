export type AdminRole = "admin" | "vendor";

export const navConfig: Record<AdminRole, { label: string; path: string }[]> = {
  admin: [
    { label: "Products", path: "/admin/products" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Vendors", path: "/admin/vendors" },
  ],
  vendor: [{ label: "Products", path: "/vendor/products" }],
};

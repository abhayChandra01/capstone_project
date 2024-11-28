import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../context/AdminProvider";
import { Product } from "../../../model/Product.model";
import {
  getProductsAPI,
  getTotalProductsCountAPI,
} from "../../../services/admin/Product.service";
import toast from "react-hot-toast";
import AddProductModal from "../../../components/Admin/Products/AddProduct/AddProductModal";
import { AdminRole } from "../../../utils/config/navConfig";
import useAdminDetails from "../../../hooks/useAdminDetails";
import { Vendor } from "../../../model/Vendor.model";
import { getVendorsAPI } from "../../../services/admin/Vendor.service";
import ProductsTable from "../../../components/Admin/Products/ProductsTable/ProductsTable";
import { Category, SubCategory } from "../../../model/Category.model";
import { getCategoriesAPI } from "../../../services/admin/Category.service";

export default function Products() {
  const { setLoading } = useAdminContext();

  const adminDetails = useAdminDetails();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>(``);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const getVendorId = (): string | null => {
    return adminDetails?.vendor_id || selectedVendor || null;
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    refreshProducts();
  };

  const fetchProducts = async (
    vendor_id: string | null,
    category_id?: string,
    sub_category_id?: string
  ) => {
    setLoading(true);
    try {
      const data = await getProductsAPI({
        page: currentPage,
        limit: limit,
        vendor_id: vendor_id,
        category_id: category_id,
        sub_category_id: sub_category_id,
      });
      setProducts(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const data = await getVendorsAPI();
      setVendors(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchTotalCount = async (
    vendor_id: string | null,
    category_id?: string,
    sub_category_id?: string
  ) => {
    setLoading(true);
    try {
      const data = await getTotalProductsCountAPI(vendor_id);
      setTotalCount(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const refreshProducts = () => {
    const vendor_id = getVendorId();
    fetchTotalCount(vendor_id, selectedCategory, selectedSubCategory);
    fetchProducts(vendor_id, selectedCategory, selectedSubCategory);
  };

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (category_id: string) => {
    setSelectedCategory(category_id);
    setSelectedSubCategory("");

    if (category_id) {
      const category = categories.find(
        (cat) => cat.category_id === category_id
      );
      if (category?.sub_categories) {
        setSubCategories(category.sub_categories);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedVendor("");
    refreshProducts();
  };

  useEffect(() => {
    if (adminDetails) {
      refreshProducts();
    }
  }, [adminDetails, selectedVendor, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (adminDetails) {
      refreshProducts();
    }
  }, [currentPage, limit]);

  useEffect(() => {
    if (adminDetails?.role === "admin") {
      fetchVendors();
      fetchCategories();
    }
  }, [adminDetails]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 h-full">
        <h1 className="text-xl font-bold">Products List</h1>
        {adminDetails?.role === "vendor" ? (
          <div className="flex items-center gap-5">
            <button
              onClick={() => openCreateModal()}
              className="w-full bg-[#4F3267] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Add Product
            </button>
          </div>
        ) : null}
      </div>
      {adminDetails?.role === "admin" ? (
        <div className="flex items-center gap-5 mb-4 bg-white rounded-lg border border-gray-300 px-2 py-4">
          <label className="text-sm font-semibold text-gray-500">Filters</label>

          <div className="flex items-center gap-2">
            <label className="text-sm">Vendor</label>
            <select
              name="vendor_id"
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              required
              className="block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
            >
              <option value="">Select</option>
              {vendors?.map((vendor) => (
                <option key={vendor.id} value={vendor.vendor_id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Category</label>
            <select
              name="category_id"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="block w-full text-sm px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {subCategories?.length > 0 ? (
            <div className="flex items-center gap-2">
              <label className="text-sm">Subcategory</label>
              <select
                name="sub_category_id"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="block w-full text-sm px-4 py-2 border border-gray-300 rounded-md"
                disabled={!subCategories.length}
              >
                <option value="">Select</option>
                {subCategories.map((subCategory) => (
                  <option
                    key={subCategory.id}
                    value={subCategory.sub_category_id}
                  >
                    {subCategory.sub_category_name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleClearFilters}
            className="bg-gray-400 text-sm text-white px-4 py-2 rounded"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      <ProductsTable products={products} refreshProducts={refreshProducts} />

      {products?.length > 0 ? (
        <div className="flex justify-end gap-10 items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
          >
            {`<`}
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
          >
            {`>`}
          </button>
        </div>
      ) : null}
      {createModalOpen && <AddProductModal onClose={closeCreateModal} />}
    </div>
  );
}

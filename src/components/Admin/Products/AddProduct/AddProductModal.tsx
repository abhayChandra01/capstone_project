import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../../model/Product.model";
import { Category, SubCategory } from "../../../../model/Category.model";
import { getCategoriesAPI } from "../../../../services/admin/Category.service";
import useAdminDetails from "../../../../hooks/useAdminDetails";
import { createProductAPI } from "../../../../services/admin/Product.service";

type Props = {
  onClose: () => void;
};

const AddProductModal: React.FC<Props> = ({ onClose }) => {
  const adminDetails = useAdminDetails();

  const [formData, setFormData] = useState<Product>({
    id: "",
    product_name: "",
    price: 0,
    discount: 0,
    stock: 0,
    category_id: "",
    sub_category_id: "",
    vendor_id: "",
    category_details: {
      id: "",
      category_id: "",
      category_name: "",
    },
    sub_category_details: {
      id: "",
      sub_category_id: "",
      sub_category_name: "",
      sub_category_icon: "",
    },
    vendor_details: {
      id: "",
      vendor_id: "",
      name: "",
      email: "",
      role: "vendor",
    },
    images: [],
    status: true,
  });

  const [imageInputs, setImageInputs] = useState(["", "", "", ""]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedImages = [...imageInputs];
    updatedImages[index] = e.target.value;
    setImageInputs(updatedImages);

    setFormData({ ...formData, images: updatedImages.filter(Boolean) });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.category_id === selectedCategoryId
    );

    if (selectedCategory) {
      setFormData({
        ...formData,
        category_id: selectedCategory.category_id,
        category_details: {
          id: selectedCategory.id,
          category_id: selectedCategory.category_id,
          category_name: selectedCategory.category_name,
        },
        sub_category_id: "",
        sub_category_details: {
          id: "",
          sub_category_id: "",
          sub_category_name: "",
          sub_category_icon: "",
        },
      });
      setSubCategories(selectedCategory.sub_categories);
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategoryId = e.target.value;
    const selectedSubCategory = subCategories.find(
      (subCategory) => subCategory.sub_category_id === selectedSubCategoryId
    );

    if (selectedSubCategory) {
      setFormData({
        ...formData,
        sub_category_id: selectedSubCategory.sub_category_id,
        sub_category_details: {
          id: selectedSubCategory.id,
          sub_category_id: selectedSubCategory.sub_category_id,
          sub_category_name: selectedSubCategory.sub_category_name,
          sub_category_icon: selectedSubCategory.sub_category_icon,
        },
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
    } catch {
      toast.error("An error occurred while fetching categories.");
    }
  };

  const validateForm = (): boolean => {
    if (!formData.product_name.trim()) {
      toast.error("Product name is required.");
      return false;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error("Price must be greater than 0.");
      return false;
    }

    if (formData.discount < 0) {
      toast.error("Discount cannot be negative.");
      return false;
    }

    if (!formData.category_id) {
      toast.error("Please select a category.");
      return false;
    }

    if (!formData.sub_category_id) {
      toast.error("Please select a subcategory.");
      return false;
    }

    const validImageUrls = formData.images.filter((url) =>
      /^https?:\/\/[^\s]+$/.test(url)
    );

    if (validImageUrls.length === 0) {
      toast.error("At least one valid product image URL is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newProductData = {
      ...formData,
      id: uuidv4(),
      vendor_details: {
        id: adminDetails?.id ?? "",
        vendor_id: adminDetails?.vendor_id ?? "",
        name: adminDetails?.name ?? "",
        email: adminDetails?.email ?? "",
        role: "vendor" as "vendor",
      },
      vendor_id: adminDetails?.vendor_id ?? "",
    };

    try {
      await createProductAPI(newProductData);
      toast.success("Product added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }

    // console.log("Submitted Form Data:", formData);
    // // Perform form submission here
    // toast.success("Product added successfully!");
    // onClose();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter product name"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter price"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter discount"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter stock"
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 items-center">
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleCategoryChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            {subCategories.length > 0 && (
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subcategory
                </label>
                <select
                  name="sub_category_id"
                  value={formData.sub_category_id}
                  onChange={handleSubCategoryChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                >
                  <option value="">Select a subcategory</option>
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
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Enter up to 4 URLs)
            </label>
            {imageInputs.map((image, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(e, index)}
                  placeholder={`Image URL ${index + 1}`}
                  className="mt-1 text-xs block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-sm text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-fit bg-[#4F3267] text-sm text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;

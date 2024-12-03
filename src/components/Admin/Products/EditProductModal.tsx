import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../model/Product.model";
import { updateProductAPI } from "../../../services/admin/Product.service";

type Props = {
  product: Product | null;
  onClose: () => void;
};

const EditProductModal: React.FC<Props> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    product_name: product?.product_name || "",
    price: product?.price || 0,
    discount: product?.discount || 0,
    stock: product?.stock || 0,
    category_id: product?.category_id || "",
    sub_category_id: product?.sub_category_id || "",
    vendor_id: product?.vendor_id || "",
    category_details: product?.category_details || {
      id: "",
      category_id: "",
      category_name: "",
    },
    sub_category_details: product?.sub_category_details || {
      id: "",
      sub_category_id: "",
      sub_category_name: "",
      sub_category_icon: "",
    },
    vendor_details: product?.vendor_details || {
      id: "",
      vendor_id: "",
      name: "",
      email: "",
      role: "vendor",
    },
    images: product?.images || [],
    status: product?.status || false,
  });

  const [imageInputs, setImageInputs] = useState<string[]>(
    product?.images || []
  );

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

    const newFormData = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount),
    };

    try {
      await updateProductAPI(formData.id, newFormData);
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            {imageInputs.map((image, index) => (
              <div key={uuidv4()} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(e, index)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                  placeholder={`Image URL ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end gap-2">
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
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProductModal;

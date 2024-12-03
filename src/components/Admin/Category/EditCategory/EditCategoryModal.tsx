import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { Category } from "../../../../model/Category.model";
import { updateCategoryAPI } from "../../../../services/admin/Category.service";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  category: Category | null;
};

const EditCategoryModal: React.FC<Props> = ({ onClose, category }) => {
  const [formData, setFormData] = useState<Category>({
    id: category?.id || "",
    category_id: category?.category_id || "",
    category_name: category?.category_name || "",
    sub_categories: category?.sub_categories || [],
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubCategoryChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedSubCategories = formData.sub_categories.map((subCategory, i) =>
      i === index ? { ...subCategory, [name]: value } : subCategory
    );
    setFormData({ ...formData, sub_categories: updatedSubCategories });
  };

  const addSubCategory = () => {
    setFormData({
      ...formData,
      sub_categories: [
        ...formData.sub_categories,
        {
          id: uuidv4(),
          sub_category_id: uuidv4(),
          sub_category_name: "",
          sub_category_icon: "",
        },
      ],
    });
  };

  const removeSubCategory = (index: number) => {
    const updatedSubCategories = formData.sub_categories.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, sub_categories: updatedSubCategories });
  };

  const validateForm = () => {
    return (
      formData.category_name &&
      formData.sub_categories.every(
        (sub) => sub.sub_category_name && sub.sub_category_icon
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await updateCategoryAPI(formData?.id, formData);
      toast.success("Category updated successfully!");
      onClose();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg w-[550px] max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4 pt-6 px-6">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-2 max-h-[420px] overflow-y-auto">
            <div className="w-full mb-4">
              <label
                htmlFor="category_name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                autoFocus
                name="category_name"
                value={formData.category_name}
                onChange={handleCategoryChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter category name"
              />
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">Sub Categories</h3>
              {formData.sub_categories.map((subCategory, index) => (
                <div
                  key={subCategory.sub_category_id}
                  className="mb-4 p-4 border rounded-md bg-gray-50"
                >
                  <div className="mb-2">
                    <label
                      htmlFor={`sub_category_name_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subcategory Name
                    </label>
                    <input
                      name="sub_category_name"
                      value={subCategory.sub_category_name}
                      onChange={(e) => handleSubCategoryChange(index, e)}
                      required
                      className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                      placeholder="Enter subcategory name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`sub_category_icon_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subcategory Icon
                    </label>
                    <input
                      name="sub_category_icon"
                      value={subCategory.sub_category_icon}
                      onChange={(e) => handleSubCategoryChange(index, e)}
                      required
                      className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                      placeholder="Enter subcategory icon URL"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubCategory(index)}
                    className="mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSubCategory}
              className="mb-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm"
            >
              Add More Subcategories
            </button>
          </div>

          <div className="flex justify-end items-center gap-2 py-4 px-6">
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

export default EditCategoryModal;

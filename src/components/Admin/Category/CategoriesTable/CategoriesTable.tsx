import React, { useState } from "react";
import { Category } from "../../../../model/Category.model";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdModeEdit,
} from "react-icons/md";
import SubCategoriesTable from "../SubCategoriesTable/SubCategoriesTable";
import EditCategoryModal from "../EditCategory/EditCategoryModal";
import { AnimatePresence, motion } from "framer-motion";
import { deleteCategoryAPI } from "../../../../services/admin/Category.service";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

interface CategoriesTableProps {
  categories: Category[];
  fetchCategories: () => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  fetchCategories,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(
    null
  );

  const toggleAccordion = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const openEditModal = (vendor: Category) => {
    setEditModalOpen(true);
    setEditCategoryData(vendor);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditCategoryData(null);
    fetchCategories();
  };

  const handleDelete = (category: Category) => {
    setDeleteModalOpen(true);
    setEditCategoryData(category);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = editCategoryData?.id || "";
      await deleteCategoryAPI(id);
      toast.success("Category deleted successfully!");
      closeDeleteModal();
      fetchCategories();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEditCategoryData(null);
  };

  return (
    <div className="overflow-x-auto bg-white h-full shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-[#4F3267]">
          <tr>
            <th className="px-6 py-4 text-xs text-white font-semibold">S.No</th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Category Name
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <React.Fragment key={category.category_id}>
              <tr className="border-t bg-gray-50 hover:bg-blue-50 transition duration-200">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {category.category_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={() => toggleAccordion(category.category_id)}
                      className="bg-gray-200 rounded-full text-gray-600 grid place-items-center h-7 w-7"
                    >
                      {expandedCategory === category.category_id ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(category)}
                      className="bg-yellow-100 rounded-full text-yellow-600 grid place-items-center h-7 w-7"
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="bg-red-100 rounded-full text-red-600 grid place-items-center h-7 w-7"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>

              <AnimatePresence>
                {expandedCategory === category.category_id && (
                  <motion.tr
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      y: { duration: 0.5, ease: "easeOut" },
                    }}
                  >
                    <td colSpan={3} className="p-5 bg-gray-200">
                      <SubCategoriesTable
                        subCategories={category.sub_categories}
                      />
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No data available!
        </div>
      )}

      {editModalOpen && (
        <EditCategoryModal
          category={editCategoryData}
          onClose={closeEditModal}
        />
      )}

      {deleteModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default CategoriesTable;

import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../context/AdminProvider";
import { Category } from "../../../model/Category.model";
import { getCategoriesAPI } from "../../../services/admin/Category.service";
import toast from "react-hot-toast";
import CategoriesTable from "../../../components/Admin/Category/CategoriesTable";
import AddCategoryModal from "../../../components/Admin/Category/AddCategoryModal";

const Vendors: React.FC = () => {
  const { setLoading } = useAdminContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 h-full">
        <h1 className="text-xl font-bold">Categories List</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="w-full bg-[#4F3267] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
          >
            Add Category
          </button>
        </div>
      </div>
      <CategoriesTable
        categories={categories}
        fetchCategories={fetchCategories}
      />

      {createModalOpen && <AddCategoryModal onClose={closeCreateModal} />}
    </div>
  );
};

export default Vendors;

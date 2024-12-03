import React, { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Product } from "../../../../model/Product.model";
import useAdminDetails from "../../../../hooks/useAdminDetails";
import StatusToggle from "../../StatusToggle/StatusToggle";
import {
  deleteProductAPI,
  updateProductAPI,
} from "../../../../services/admin/Product.service";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import EditProductModal from "../EditProduct/EditProductModal";
import { useNavigate } from "react-router-dom";

interface ProductsTableProps {
  products: Product[];
  refreshProducts: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  refreshProducts,
}) => {
  const adminDetails = useAdminDetails();
  const navigate = useNavigate();
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleStatusChange = async (product: Product) => {
    let newData = {
      ...product,
      status: !product.status,
    };

    try {
      await updateProductAPI(product.id, newData);
      toast.success("Status changed successfully!");
      refreshProducts();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDelete = (product: Product) => {
    setDeleteModalOpen(true);
    setEditProductData(product);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = editProductData?.id || "";
      await deleteProductAPI(id);
      toast.success("Product deleted successfully!");
      closeDeleteModal();
      refreshProducts();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEditProductData(null);
  };

  const openEditModal = (product: Product) => {
    setEditModalOpen(true);
    setEditProductData(product);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProductData(null);
    refreshProducts();
  };

  return (
    <div className="overflow-x-auto bg-white h-full shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-[#4F3267]">
          <tr>
            <th className="px-6 py-4 text-xs text-white font-semibold">S.No</th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Product Name
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Price
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Discount
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Stock
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Category
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Subcategory
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Status
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {String(index + 1).padStart(2, "0")}{" "}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {product.product_name}
                <br />
                {adminDetails?.role === "admin" ? (
                  <span className="font-semibold text-gray-500 text-xs">
                    (By {product?.vendor_details?.name})
                  </span>
                ) : null}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {product.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {product.discount}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {product.stock}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {product.category_details?.category_name}
              </td>

              <td className="px-6 py-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  {product.sub_category_details.sub_category_icon ? (
                    <img
                      src={product.sub_category_details.sub_category_icon}
                      alt={product.sub_category_details.sub_category_name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400">No Icon</span>
                  )}
                  {product.sub_category_details?.sub_category_name}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <StatusToggle
                  isActive={product.status}
                  onToggle={() => handleStatusChange(product)}
                />
              </td>

              <td className="px-6 py-4 text-sm text-gray-800">
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => navigate(product.id)}
                    className="bg-gray-200 rounded-full text-gray-600 grid place-items-center h-7 w-7"
                  >
                    <FaEye />
                  </button>

                  {adminDetails?.role !== "admin" ? (
                    <>
                      {" "}
                      <button
                        onClick={() => openEditModal(product)}
                        className="bg-yellow-100 rounded-full text-yellow-600 grid place-items-center h-7 w-7"
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="bg-red-100 rounded-full text-red-600 grid place-items-center h-7 w-7"
                      >
                        <MdDelete />
                      </button>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products?.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No data available!
        </div>
      ) : null}

      {deleteModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      {editModalOpen && (
        <EditProductModal product={editProductData} onClose={closeEditModal} />
      )}
    </div>
  );
};

export default ProductsTable;

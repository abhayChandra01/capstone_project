import React, { useEffect, useState } from "react";
import { createVendor, Vendor } from "../../../model/Vendor.model";
import {
  deleteVendorAPI,
  getVendorsAPI,
} from "../../../services/admin/Vendor.service";
import VendorsTable from "../../../components/Admin/Vendors/VendorsTable/VendorsTable";
import { useAdminContext } from "../../../context/AdminProvider";
import toast from "react-hot-toast";
import AddVendorModal from "../../../components/Admin/Vendors/AddVendor/AddVendorModal";
import EditVendorModal from "../../../components/Admin/Vendors/EditVendor/EditVendorModal";
import ConfirmationModal from "../../../components/Admin/ConfirmationModal/ConfirmationModal";

const Vendors: React.FC = () => {
  const { setLoading } = useAdminContext();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editVendorData, setEditVendorData] = useState<createVendor | null>(
    null
  );

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

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
    fetchVendors();
  };

  const openEditModal = (vendor: createVendor) => {
    setEditModalOpen(true);
    setEditVendorData(vendor);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditVendorData(null);
    fetchVendors();
  };

  const handleDelete = (vendor: createVendor) => {
    setDeleteModalOpen(true);
    setEditVendorData(vendor);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = editVendorData?.id || "";
      await deleteVendorAPI(id);
      toast.success("Vendor deleted successfully!");
      closeDeleteModal();
      fetchVendors();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEditVendorData(null);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 h-full">
        <h1 className="text-xl font-bold">Vendors List</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={() => openCreateModal()}
            className="w-full bg-[#4F3267] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
          >
            Add Vendor
          </button>
        </div>
      </div>
      <VendorsTable
        vendors={vendors}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {createModalOpen && <AddVendorModal onClose={closeCreateModal} />}
      {editModalOpen && (
        <EditVendorModal vendor={editVendorData} onClose={closeEditModal} />
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

export default Vendors;

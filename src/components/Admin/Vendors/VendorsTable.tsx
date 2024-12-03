import React from "react";
import { createVendor, Vendor } from "../../../model/Vendor.model";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

interface VendorsTableProps {
  vendors: Vendor[];
  onEdit: (vendor: createVendor) => void;
  onDelete: (vendor: createVendor) => void;
}

const VendorsTable: React.FC<VendorsTableProps> = ({
  vendors,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white h-full shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-[#4F3267]">
          <tr>
            <th className="px-6 py-4 text-xs text-white font-semibold">S.No</th>
            <th className="px-6 py-4 text-xs text-white font-semibold">Name</th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-xs text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr
              key={vendor.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {String(index + 1).padStart(2, "0")}{" "}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{vendor.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vendor.email}
              </td>

              <td className="px-6 py-4 text-sm text-gray-800">
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => onEdit(vendor)}
                    className="bg-yellow-100 rounded-full text-yellow-600 grid place-items-center h-7 w-7"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => onDelete(vendor)}
                    className="bg-red-100 rounded-full text-red-600 grid place-items-center h-7 w-7"
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {vendors?.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No data available!
        </div>
      ) : null}
    </div>
  );
};

export default VendorsTable;

import React from "react";
import { SubCategory } from "../../../../model/Category.model";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface SubCategoriesTableProps {
  subCategories: SubCategory[];
}

const SubCategoriesTable: React.FC<SubCategoriesTableProps> = ({
  subCategories,
}) => {
  return (
    <div className="w-full overflow-x-auto bg-white h-full shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-[#4F3267]">
          <tr>
            <th className="px-6 py-4 text-xs text-white font-semibold">S.No</th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Sub Category Name
            </th>
            <th className="px-6 py-4 text-xs text-white font-semibold">
              Sub Category Icon
            </th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory, index) => (
            <tr
              key={subCategory.sub_category_id}
              className="border-t bg-white hover:bg-blue-50 transition duration-200"
            >
              <td className="px-6 py-3 text-sm text-gray-800">
                {String(index + 1).padStart(2, "0")}{" "}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">
                {subCategory.sub_category_name}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">
                {subCategory.sub_category_icon ? (
                  <img
                    src={subCategory.sub_category_icon}
                    alt={subCategory.sub_category_name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-gray-400">No Icon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategoriesTable;

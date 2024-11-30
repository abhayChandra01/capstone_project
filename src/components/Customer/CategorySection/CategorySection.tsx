import React, { useState } from "react";
import { motion } from "framer-motion";
import { Category } from "../../../model/Category.model";
import { useAppContext } from "../../../context/AppProvider";
import { useNavigate } from "react-router-dom";

const CategorySection: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useAppContext();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="h-full">
      <div className="relative hidden md:flex items-center md:gap-5 xl:gap-10 h-full">
        {categories?.map((category) => (
          <div
            key={category?.id}
            className="relative h-full"
            onMouseEnter={() => setHoveredItem(category?.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() =>
              navigate(`/products?cat_id=${category?.category_id}`)
            }
          >
            <motion.div
              className="relative text-[14px] xl:text-base flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {category.category_name}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F3267] to-[#8863FB] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredItem === category?.id ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {hoveredItem === category?.id &&
              category.sub_categories?.length > 0 && (
                <motion.div
                  className="absolute z-[1000] top-full left-0 w-max bg-white shadow-lg border border-gray-200 p-2 rounded-lg flex flex-col"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.sub_categories.map((subCategory: any) => (
                    <div
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                        navigate(
                          `/products?sub_cat_id=${subCategory?.sub_category_id}`
                        );
                      }}
                      key={subCategory.id}
                      className="px-4 xl:px-6 py-2 text-[14px] xl:text-base cursor-pointer text-gray-700 inline-flex items-center gap-2 xl:gap-5 transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB]"
                    >
                      {subCategory.sub_category_icon ? (
                        <img
                          src={subCategory.sub_category_icon}
                          alt={subCategory.sub_category_name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-400">No Icon</span>
                      )}
                      {subCategory.sub_category_name}
                    </div>
                  ))}
                </motion.div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

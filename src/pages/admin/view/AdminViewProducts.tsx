import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../context/AdminProvider";
import useAdminDetails from "../../../hooks/useAdminDetails";
import { Product } from "../../../model/Product.model";
import { getProductByIdAPI } from "../../../services/admin/Product.service";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

export default function AdminViewProducts() {
  const navigate = useNavigate();
  const { setLoading } = useAdminContext();
  const { id } = useParams();
  const adminDetails = useAdminDetails();

  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await getProductByIdAPI(id || "");
      setProductDetails(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): string => {
    const discountedPrice = price - (price * discount) / 100;
    return new Intl.NumberFormat("en-IN").format(discountedPrice);
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Products List</h1>
        <div className="w-full text-gray-700 flex items-center gap-2">
          <h1
            onClick={() => navigate(-1)}
            className="text-sm cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
          >
            Products
          </h1>
          <IoIosArrowForward />
          <h1 className="text-sm">{productDetails?.product_name}</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          className="flex-1 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {productDetails?.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={productDetails?.product_name}
              className="rounded-lg shadow-lg object-cover w-full"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>

        {/* Product Info Section */}
        <motion.div
          className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Name and Category */}
          <h1 className="text-2xl font-bold text-gray-800">
            {productDetails?.product_name}
          </h1>
          <p className="mt-2 text-gray-500">
            Category:{" "}
            <span className="font-medium">
              {productDetails?.category_details.category_name}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {productDetails?.sub_category_details.sub_category_name}
            </span>
          </p>
          <p className="mt-2 flex items-center gap-2">
            <img
              src={productDetails?.sub_category_details.sub_category_icon}
              alt="Sub Category Icon"
              className="w-8 h-8 rounded-full"
            />
          </p>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-gray-600 line-through">
              ₹{productDetails?.price.toLocaleString()}
            </p>
            <p className="text-3xl font-bold text-[#8863FB]">
              ₹
              {calculateDiscountedPrice(
                productDetails?.price || 0,
                productDetails?.discount || 0
              )}
            </p>
            <p className="text-sm text-gray-500">
              ({productDetails?.discount}% Off)
            </p>
          </div>

          {/* Stock and Vendor Info */}
          <div className="mt-6">
            <p
              className={`text-sm font-medium ${
                productDetails?.stock ? "text-green-500" : "text-red-500"
              }`}
            >
              {productDetails?.stock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Sold by:{" "}
              <span className="font-medium">
                {productDetails?.vendor_details.name}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Email: {productDetails?.vendor_details.email}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  addToCartAPI,
  addToWishlistAPI,
  getProductByIdAPI,
} from "../../../../services/customer/Products.service";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../../../../components/Shared/Loading/Loading";
import { IoIosArrowForward } from "react-icons/io";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useAppContext } from "../../../../context/AppProvider";
import useCustomerDetails from "../../../../hooks/useCustomerDetails";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../../model/Product.model";
import { FaCheck } from "react-icons/fa";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

export default function ViewProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setLoading, setRefreshDetails, isLoggedIn, openLoginModal } =
    useAppContext();
  const customerDetails = useCustomerDetails();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["view-product", id],
    queryFn: () => getProductByIdAPI(id || ""),
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  if (isError) {
    navigate(-1);
    toast.error("An error occurred! Please try again.");
  }

  const isInWishlist = customerDetails?.wishlist?.some(
    (wishlistItem) => wishlistItem.product_details?.id === id
  );

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): string => {
    const discountedPrice = price - (price * discount) / 100;
    return new Intl.NumberFormat("en-IN").format(discountedPrice);
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setLoading(true);

    const product_details: Product = product || {
      id: "",
      product_name: "",
      price: 0,
      discount: 0,
      stock: 0,
      category_id: "",
      sub_category_id: "",
      vendor_id: "",
      category_details: {
        id: "",
        category_id: "",
        category_name: "",
      },
      sub_category_details: {
        id: "",
        sub_category_id: "",
        sub_category_name: "",
        sub_category_icon: "",
      },
      vendor_details: {
        id: "",
        vendor_id: "",
        name: "",
        email: "",
        role: "vendor",
      },
      images: [],
      status: true,
    };
    const newWishlistItem = {
      id: uuidv4(),
      wishlist_id: uuidv4(),
      product_details: product_details,
    };

    const updatedWishlist = [
      ...(customerDetails?.wishlist || []),
      newWishlistItem,
    ];

    try {
      const user = await addToWishlistAPI(
        customerDetails?.id || "",
        updatedWishlist
      );
      toast.success("Wishlist updated successfully!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setLoading(true);

    const product_details: Product = product || {
      id: "",
      product_name: "",
      price: 0,
      discount: 0,
      stock: 0,
      category_id: "",
      sub_category_id: "",
      vendor_id: "",
      category_details: {
        id: "",
        category_id: "",
        category_name: "",
      },
      sub_category_details: {
        id: "",
        sub_category_id: "",
        sub_category_name: "",
        sub_category_icon: "",
      },
      vendor_details: {
        id: "",
        vendor_id: "",
        name: "",
        email: "",
        role: "vendor",
      },
      images: [],
      status: true,
    };

    const updatedCart = [...(customerDetails?.cart || [])];

    const existingCartItemIndex = updatedCart.findIndex(
      (item) => item.product_details.id === product_details.id
    );

    if (existingCartItemIndex !== -1) {
      updatedCart[existingCartItemIndex].product_count += 1;
    } else {
      const newCartItem = {
        id: uuidv4(),
        cart_id: uuidv4(),
        product_count: 1,
        product_details: product_details,
      };
      updatedCart.push(newCartItem);
    }

    try {
      const user = await addToCartAPI(customerDetails?.id || "", updatedCart);
      toast.success("Cart updated successfully!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading ? <Loading fullscreen={true} /> : null}

      <div className="w-full text-gray-700 flex items-center gap-2 p-4">
        <h1
          onClick={() => navigate(-1)}
          className="text-sm cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
        >
          Products
        </h1>
        <IoIosArrowForward />
        <h1 className="text-sm">{product?.product_name}</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[60%] flex flex-wrap">
          {product?.images?.map((item, index) => (
            <motion.div
              key={index}
              className="relative w-[50%] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.img
                src={item}
                alt={`image-${index}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="w-full md:w-[40%] p-4 bg-white">
          <h2 className="text-lg font-bold">{product?.product_name}</h2>
          <p className="text-sm">
            Exquisite jewelry that captures timeless elegance and personal
            expression.
          </p>
          <div className="mt-4 flex gap-2 items-center">
            <p className="text-[#4F3267] text-3xl font-bold">
              ₹
              {calculateDiscountedPrice(
                product?.price || 0,
                product?.discount || 0
              )}
            </p>
            <p className="text-gray-700 line-through">₹{product?.price}</p>
          </div>
          <div className="text-sm text-gray-500">
            (MRP Inclusive of all taxes)
          </div>
          <div className="text-base font-semibold text-green-600 mt-4 border border-green-700 w-fit px-2 py-1 rounded-lg bg-green-100">
            {product?.discount}% Off
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Category :</span>
              {product?.category_details?.category_name}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sub-Category :</span>
              {product?.sub_category_details.sub_category_name}
              {product?.sub_category_details.sub_category_icon ? (
                <img
                  src={product?.sub_category_details.sub_category_icon}
                  alt={product?.sub_category_details.sub_category_name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-gray-400">No Icon</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Product by :</span>
              {product?.vendor_details?.name}
            </div>
          </div>
          <div className="mt-8">
            Explore stunning collections.
            <br /> Designs—crafted to suit every style and occasion.
          </div>

          <div
            className={`mt-4 flex gap-2 ${
              isInWishlist ? `flex-col` : `flex-row items-center`
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267] max-w-md"
            >
              Add to cart
            </button>

            {isInWishlist ? (
              <div className="text-sm text-green-600 font-semibold inline-flex items-center gap-2">
                Already in Wishlist
                <FaCheck />
              </div>
            ) : (
              <button
                onClick={handleAddToWishlist}
                className="w-10 h-10 grid place-items-center border border-[#4F3267] bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
              >
                <FaHeartCircleCheck size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

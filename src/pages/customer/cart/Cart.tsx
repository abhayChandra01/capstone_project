import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { useAppContext } from "../../../context/AppProvider";
import {
  getCartAPI,
  updateCartAPI,
} from "../../../services/customer/Products.service";
import toast from "react-hot-toast";
import Loading from "../../../components/Shared/Loading/Loading";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const { setRefreshDetails, setLoading } = useAppContext();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", customerDetails],
    queryFn: getCartAPI,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  const handleUpdateQuantity = async (itemId: string, newCount: number) => {
    if (newCount < 1) {
      toast.error("Product count cannot be less than 1.");
      return;
    }

    try {
      const cart = userData?.cart || [];

      const updatedCart = cart?.map((item) =>
        item.id === itemId ? { ...item, product_count: newCount } : item
      );

      const user = await updateCartAPI(customerDetails?.id || "", updatedCart);

      toast.success("Cart updated successfully!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const cart = userData?.cart || [];

      const updatedCart = cart.filter((item) => item.id !== itemId);

      const user = await updateCartAPI(customerDetails?.id || "", updatedCart);

      toast.success("Item removed from cart!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
    } catch {
      toast.error("An error occurred while removing the item.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): number => {
    return price - (price * discount) / 100;
  };

  const calculateTotalPricePerItem = (
    price: number,
    discount: number,
    quantity: number
  ): string => {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const totalPrice = discountedPrice * quantity;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(totalPrice);
  };

  const calculateTotalPricePerItemWithDiscount = (
    price: number,
    quantity: number
  ): string => {
    const totalPrice = price * quantity;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(totalPrice);
  };

  const calculateGrandTotal = (cart: any[]): string => {
    const total = cart.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.product_details.price,
        item.product_details.discount
      );
      return acc + discountedPrice * item.product_count;
    }, 0);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(total);
  };

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {isLoading ? <Loading fullscreen={true} /> : null}

      {userData?.cart?.length === 0 ? (
        <div className="flex flex-col items-center w-full text-lg text-gray-400">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            className="w-full max-w-md"
            alt="No items"
          />
          No items available!
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {userData?.cart?.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex md:flex-row flex-col"
            >
              <img
                src={item.product_details.images[0]}
                alt={item.product_details.product_name}
                className="w-48 h-48 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  {item.product_details.product_name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Price : ₹{item.product_details.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Discount : {item.product_details.discount}%
                </p>
                <div className="mt-2">
                  <p className="text-[#4F3267] font-bold">
                    Total :{" "}
                    {calculateTotalPricePerItem(
                      item?.product_details?.price,
                      item?.product_details.discount,
                      item?.product_count
                    )}
                    <span className="ml-2 text-gray-700 line-through text-[14px] font-normal">
                      {calculateTotalPricePerItemWithDiscount(
                        item?.product_details?.price,
                        item?.product_count
                      )}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.product_count - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-center w-8">{item.product_count}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.product_count + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 bg-red-100 p-2 rounded-lg text-sm text-red-600 hover:text-red-800 inline-flex items-center gap-2"
                  >
                    Remove
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 mb-10 p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Grand Total:</span>
              <span className="text-lg font-semibold text-green-600">
                {calculateGrandTotal(userData?.cart || [])}
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-fit bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

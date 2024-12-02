import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  addToWishlistAPI,
  getWishlistAPI,
} from "../../../services/customer/Products.service";
import toast from "react-hot-toast";
import ProductCard from "../../../components/Customer/ProductsCard/ProductsCard";
import Loading from "../../../components/Shared/Loading/Loading";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { useAppContext } from "../../../context/AppProvider";
import { FaTrashAlt } from "react-icons/fa";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const Wishlist: React.FC = () => {
  const queryClient = useQueryClient();
  const customerDetails = useCustomerDetails();
  const { setRefreshDetails } = useAppContext();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist", customerDetails],
    queryFn: getWishlistAPI,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  const handleDelete = async (productId: string) => {
    const updatedWishlist =
      customerDetails?.wishlist?.filter(
        (item) => item.product_details.id !== productId
      ) || [];

    console.log(updatedWishlist);
    // return;

    try {
      const user = await addToWishlistAPI(
        customerDetails?.id || "",
        updatedWishlist
      );
      toast.success("Wishlist updated successfully!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {isLoading ? <Loading fullscreen={true} /> : null}
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user?.wishlist?.map((item) => (
          <div key={item?.product_details.id} className="relative group">
            <ProductCard product={item?.product_details} />

            <button
              onClick={() => handleDelete(item?.product_details.id)}
              className="absolute bottom-2 right-5 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 p-2 rounded-lg text-sm text-red-600 hover:text-red-800 inline-flex items-center gap-2"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ))}
      </div>
      {user?.wishlist?.length === 0 ? (
        <div className="flex flex-col items-center w-full text-lg text-gray-400">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            className="w-full max-w-md"
          />
          No items available!
        </div>
      ) : null}
    </div>
  );
};

export default Wishlist;

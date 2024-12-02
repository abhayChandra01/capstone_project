import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../../components/Shared/Loading/Loading";
import {
  getCartAPI,
  placeOrderAPI,
} from "../../../services/customer/Products.service";
import { useAppContext } from "../../../context/AppProvider";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../model/Product.model";
import { useNavigate } from "react-router-dom";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const { setRefreshDetails } = useAppContext();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", customerDetails],
    queryFn: getCartAPI,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): number => {
    return price - (price * discount) / 100;
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

  const handlePlaceOrder = async () => {
    if (!customerDetails || !customerDetails.cart?.length) {
      toast.error("Your cart is empty!");
      return;
    }

    const cart: any[] = customerDetails?.cart || [];

    const total_amount = cart.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.product_details.price,
        item.product_details.discount
      );
      return acc + discountedPrice * item.product_count;
    }, 0);

    const updatedCart: [] = [];
    const newOrder = {
      id: uuidv4(),
      order_id: uuidv4(),
      order_date: new Date().toISOString(),
      total_amount: total_amount,
      products_ordered: cart.map((item) => ({
        id: uuidv4(),
        product_count: item.product_count,
        product_details: item.product_details,
      })),
    };

    const updatedOrders = [...(customerDetails.orders || []), newOrder];

    try {
      const user = await placeOrderAPI(
        customerDetails.id,
        updatedCart,
        updatedOrders
      );

      toast.success("Order placed successfully!");
      localStorage.setItem("customer_user", JSON.stringify(user));
      setRefreshDetails(true);
      navigate("/order-placed", {
        state: newOrder?.order_id,
      });
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

      {isLoading ? (
        <Loading fullscreen={true} />
      ) : userData?.cart?.length === 0 ? (
        <div className="flex flex-col items-center text-lg text-gray-500">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            alt="No items"
            className="w-64 mb-4"
          />
          No items available in your cart!
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex flex-col gap-6">
            {userData?.cart?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start gap-4 border-b pb-4"
              >
                <img
                  src={item.product_details.images[0]}
                  alt={item.product_details.product_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item.product_details.product_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: ₹{item.product_details.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Discount: {item.product_details.discount}%
                  </p>
                  <div className="mt-2 text-gray-700">
                    <p className="text-sm">
                      Quantity: <strong>{item.product_count}</strong>
                    </p>
                    <p className="text-sm">
                      Total:
                      <span className="font-semibold text-green-600 ml-2">
                        ₹
                        {(
                          calculateDiscountedPrice(
                            item.product_details.price,
                            item.product_details.discount
                          ) * item.product_count
                        ).toLocaleString()}
                      </span>
                      <span className="line-through ml-2 text-gray-400">
                        ₹
                        {(
                          item.product_details.price * item.product_count
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border-t">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold">Grand Total:</span>
              <span className="font-bold text-green-600">
                {calculateGrandTotal(userData?.cart || [])}
              </span>
            </div>
            <div className="w-full mt-4 flex justify-center">
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg text-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 max-w-md mx-auto"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

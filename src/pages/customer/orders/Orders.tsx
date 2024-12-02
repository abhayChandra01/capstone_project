import React from "react";
import { useNavigate } from "react-router-dom";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { useAppContext } from "../../../context/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { getOrdersAPI } from "../../../services/customer/Products.service";
import Loading from "../../../components/Shared/Loading/Loading";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const { setRefreshDetails } = useAppContext();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", customerDetails],
    queryFn: getOrdersAPI,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      {isLoading ? <Loading fullscreen={true} /> : null}

      {userData?.orders?.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {userData?.orders?.map((order) => (
            <div key={order.id} className="border-b bg-white p-4 rounded-lg">
              <div className="flex md:flex-row flex-col justify-between md:items-center">
                <div className="text-sm font-semibold">
                  Order ID: {order.order_id}
                </div>
                <div className="text-sm text-gray-500">
                  Order Date: {new Date(order.order_date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-base mt-2">
                Total Amount :{" "}
                <span className="text-green-700">
                  ₹
                  {order?.total_amount
                    ? new Intl.NumberFormat("en-IN").format(order?.total_amount)
                    : `-`}
                </span>
              </div>
              <div className="mt-2 overflow-hidden">
                <h4 className="font-medium text-sm">Products Ordered:</h4>
                {order.products_ordered.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      navigate(`/products/${product.product_details.id}`)
                    }
                    className="flex items-center space-x-4 mt-2 cursor-pointer hover:scale-[101%] transition-all ease-in-out duration-150"
                  >
                    <img
                      src={product.product_details.images[0]}
                      alt={product.product_details.product_name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold">
                        {product.product_details.product_name}
                      </div>
                      <div className="text-sm">
                        Quantity: {product.product_count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

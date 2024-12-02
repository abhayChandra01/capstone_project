import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderPlaced() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state || null;

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Thanks for Ordering!
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your order has been successfully placed. We appreciate your trust in
          us!
        </motion.p>
        <motion.div
          className="bg-gray-100 p-4 rounded-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-lg font-semibold text-gray-700">{orderId}</p>
        </motion.div>
        <motion.p
          className="text-gray-600 max-w-xs mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You can head to the{" "}
          <span
            onClick={() => navigate("/orders")}
            className="text-blue-500 hover:underline font-medium cursor-pointer"
          >
            My Orders
          </span>{" "}
          section to view your orders.
        </motion.p>
      </motion.div>
    </div>
  );
}

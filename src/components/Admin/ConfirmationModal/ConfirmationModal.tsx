import React from "react";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<Props> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 w-[450px]"
      >
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className="text-sm text-gray-700 mb-6">
          Are you sure? This action can't be undone.
        </p>

        <div className="flex justify-end items-center gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-sm text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#4F3267] text-sm text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;

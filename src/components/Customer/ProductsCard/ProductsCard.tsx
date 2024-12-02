import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../../../model/Product.model";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): string => {
    const discountedPrice = price - (price * discount) / 100;
    return new Intl.NumberFormat("en-IN").format(discountedPrice);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        product?.images?.length
          ? (prevIndex + 1) % product.images.length
          : prevIndex
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product.images]);

  return (
    <motion.div
      className="p-4 w-full cursor-pointer border border-gray-200 bg-[#F9F9FB] rounded-lg hover:shadow-lg transition-shadow max-w-none sm:max-w-[250px] h-[350px] flex flex-col gap-4 justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative w-full h-full rounded-t-lg overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute top-0 left-0 w-full h-full flex"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={product.images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="rounded-t-lg object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <h3 className="text-sm">{product.product_name}</h3>
        <div className="mt-1 flex gap-2 items-center">
          <p className="text-[#4F3267] font-bold">
            ₹{calculateDiscountedPrice(product.price, product.discount)}
          </p>
          <p className="text-gray-700 line-through text-[14px]">
            ₹{product.price}
          </p>
        </div>
        <p className="text-sm text-green-600 mt-1">{product.discount}% Off</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/GoldenFriday/01/Desktop.webp",
  "https://cdn.caratlane.com/media/static/images/V4/2024/CL/10_OCT/Banner/Egold/1/Desktop_1920x694.jpg",
  "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Blog/Desktop_1920x694.webp",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-[calc(100vh-95px)] overflow-hidden">
      <div className="absolute top-0 left-0 flex w-full h-[calc(100vh-95px)]">
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
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;

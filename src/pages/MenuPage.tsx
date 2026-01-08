import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import menuFront from "@/assets/menu-front.jpeg";
import menuLeft from "@/assets/menu-left.jpeg";
import menuRight from "@/assets/menu-right.jpeg";
import menuBack from "@/assets/menu-back.jpeg";

const images = [menuFront, menuLeft, menuRight, menuBack];

const MenuPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 right-6 text-white z-50"
      >
        <X size={28} />
      </button>

      {/* Center Image Slideshow */}
      <div
        className="relative w-full max-w-4xl h-[70vh] cursor-pointer"
        onClick={next}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Hint */}
      <div className="absolute bottom-8 text-white text-sm opacity-70 tracking-widest">
        TAP TO SEE NEXT PAGE
      </div>
    </div>
  );
};

export default MenuPage;

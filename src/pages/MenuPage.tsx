import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import menuFront from "@/assets/menu-front.jpeg";
import menuLeft from "@/assets/menu-left.jpeg";
import menuRight from "@/assets/menu-right.jpeg";
import menuBack from "@/assets/menu-back.jpeg";
import Header from "@/components/Header";

const menuPages = [
  { src: menuFront, label: "Front Cover" },
  { src: menuLeft, label: "Cocktails" },
  { src: menuRight, label: "Spirits" },
  { src: menuBack, label: "Back Cover" },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const goToPage = (newIndex: number) => {
    if (isFlipping || newIndex === currentPage) return;
    setIsFlipping(true);
    setDirection(newIndex > currentPage ? 1 : -1);
    setCurrentPage(newIndex);
    setTimeout(() => setIsFlipping(false), 800);
  };

  const nextPage = () => {
    if (currentPage < menuPages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isFlipping]);

  const slideVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.85,
    }),
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">
      <Header />
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />
      </div>
      {/* ===== TOP TITLE ===== */}
      <motion.div
  className="absolute top-24  inset-x-0 z-30 flex flex-col items-center text-center pointer-events-none"
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  <h1 className="font-display text-4xl md:text-5xl text-primary tracking-widest">
    OUR MENU
  </h1>
  <p className="mt-2 text-xs tracking-[0.35em] text-white/60 whitespace-nowrap">
    CRAFTED WITH PASSION
  </p>
</motion.div>


      {/* Navigation */}
      <motion.button
        onClick={prevPage}
        className={`absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 ${
          currentPage === 0 && "opacity-30 pointer-events-none"
        }`}
        whileHover={{ scale: 1.1, x: -6 }}
      >
        <ChevronLeft size={28} />
      </motion.button>

      <motion.button
        onClick={nextPage}
        className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 ${
          currentPage === menuPages.length - 1 &&
          "opacity-30 pointer-events-none"
        }`}
        whileHover={{ scale: 1.1, x: 6 }}
      >
        <ChevronRight size={28} />
      </motion.button>

      {/* Menu Card */}
      <div
  className="
    relative w-full 
    h-[80vh] 
    flex items-center justify-center 
    px-4 
    mt-16 
    md:mt-32 
    lg:mt-40
  "
  style={{ perspective: "1500px" }}
  onClick={nextPage}
>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={menuPages[currentPage].src}
                alt={menuPages[currentPage].label}
                className="max-h-[75vh] max-w-[90vw] object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint */}
      <p className="absolute bottom-10 text-xs tracking-[0.3em] text-white/40 uppercase">
        Click or use arrows to navigate
      </p>
    </div>
  );
};

export default MenuPage;

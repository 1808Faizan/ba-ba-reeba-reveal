import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import menuFront from "@/assets/menu-front.jpeg";
import menuLeft from "@/assets/menu-left.jpeg";
import menuRight from "@/assets/menu-right.jpeg";
import menuBack from "@/assets/menu-back.jpeg";

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

  // Keyboard navigation
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
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Close Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 right-6 text-white/70 hover:text-white z-50 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={24} />
      </motion.button>

      {/* Title */}
      <motion.div 
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wider">OUR MENU</h1>
        <p className="text-white/50 text-sm tracking-widest mt-2">CRAFTED WITH PASSION</p>
      </motion.div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevPage}
        className={`absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all ${currentPage === 0 ? "opacity-30 pointer-events-none" : ""}`}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={28} />
      </motion.button>

      <motion.button
        onClick={nextPage}
        className={`absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all ${currentPage === menuPages.length - 1 ? "opacity-30 pointer-events-none" : ""}`}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={28} />
      </motion.button>

      {/* Menu Card Container */}
      <div 
        className="relative w-[85vw] md:w-[60vw] lg:w-[50vw] max-w-2xl aspect-[3/4] cursor-pointer perspective-1000"
        style={{ perspective: "1500px" }}
        onClick={nextPage}
      >
        {/* Card Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/50 rounded-[50%] blur-2xl" />

        {/* Card Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-amber-500/20 rounded-2xl blur-xl opacity-50" />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Image */}
              <img
                src={menuPages[currentPage].src}
                alt={menuPages[currentPage].label}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Page Label */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-primary text-sm tracking-widest mb-1">PAGE {currentPage + 1}</p>
                <h2 className="font-display text-3xl md:text-4xl text-white">{menuPages[currentPage].label}</h2>
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Indicators */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {menuPages.map((page, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goToPage(idx);
            }}
            className="group relative"
          >
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentPage 
                  ? "bg-primary w-8" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              layoutId="pageIndicator"
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {page.label}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Hint Text */}
      <motion.p 
        className="absolute bottom-20 text-white/40 text-xs tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Click card or use arrows to navigate
      </motion.p>
    </div>
  );
};

export default MenuPage;

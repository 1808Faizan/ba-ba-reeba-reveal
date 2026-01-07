import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import menuFront from '@/assets/menu-front.jpg';
import menuLeft from '@/assets/menu-left.jpg';
import menuRight from '@/assets/menu-right.jpg';
import menuBack from '@/assets/menu-back.jpg';

const MenuPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden noise-overlay">
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 p-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={28} />
      </motion.button>

      {/* Brand animation when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.h1
              className="text-hero-brand-sm text-foreground/10 font-display tracking-widest"
              animate={{
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              BABAREEBA
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Book Container */}
      <div 
        className="relative w-full max-w-4xl h-[70vh] cursor-pointer perspective-1000"
        onClick={toggleMenu}
        style={{ perspective: '2000px' }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Closed Menu - Front Cover
            <motion.div
              key="closed"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                className="relative w-full max-w-sm h-full shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={menuFront}
                  alt="Menu Front"
                  className="w-full h-full object-cover rounded-r-md"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-r-md" />
                <motion.div 
                  className="absolute bottom-8 left-0 right-0 text-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm text-foreground/70 font-display tracking-widest">
                    TAP TO OPEN
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Open Menu - Book Spread
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-1"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Left Page */}
              <motion.div
                initial={{ rotateY: 90, x: 100 }}
                animate={{ rotateY: 0, x: 0 }}
                exit={{ rotateY: 90, x: 100 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-1/2 h-full max-w-sm shadow-xl origin-right"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={menuLeft}
                  alt="Menu Left Page"
                  className="w-full h-full object-cover rounded-l-md"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent rounded-l-md" />
              </motion.div>

              {/* Right Page */}
              <motion.div
                initial={{ rotateY: -90, x: -100 }}
                animate={{ rotateY: 0, x: 0 }}
                exit={{ rotateY: -90, x: -100 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-1/2 h-full max-w-sm shadow-xl origin-left"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={menuRight}
                  alt="Menu Right Page"
                  className="w-full h-full object-cover rounded-r-md"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-r-md" />
              </motion.div>

              {/* Close hint */}
              <motion.div 
                className="absolute bottom-4 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-sm text-foreground/50 font-display tracking-widest">
                  TAP TO CLOSE
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(38 92% 50% / 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default MenuPage;

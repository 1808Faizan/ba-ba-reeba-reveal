import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import drink1 from '@/assets/drink-1.jpg';
import drink2 from '@/assets/drink-2.jpg';
import drink3 from '@/assets/drink-3.jpg';
import drink4 from '@/assets/drink-4.jpg';
import drink5 from '@/assets/drink-5.jpg';

const drinks = [
  { 
    name: "Old Fashioned", 
    description: "Bourbon, bitters, orange peel, sugar cube", 
    image: drink1,
    color: "#D4A574",
    price: "$18",
    ingredients: ["Bourbon", "Angostura Bitters", "Orange Peel", "Sugar"]
  },
  { 
    name: "Violet Hour", 
    description: "Gin, violet liqueur, fresh lemon, lavender", 
    image: drink2,
    color: "#9B7BB8",
    price: "$22",
    ingredients: ["Gin", "Crème de Violette", "Lemon", "Lavender"]
  },
  { 
    name: "Garden Mojito", 
    description: "White rum, mint leaves, lime, cane sugar", 
    image: drink3,
    color: "#7CB882",
    price: "$16",
    ingredients: ["White Rum", "Fresh Mint", "Lime", "Sugar Cane"]
  },
  { 
    name: "Blood Orange Negroni", 
    description: "Gin, Campari, sweet vermouth, blood orange", 
    image: drink4,
    color: "#E85D4C",
    price: "$20",
    ingredients: ["Gin", "Campari", "Vermouth", "Blood Orange"]
  },
  { 
    name: "Golden Toast", 
    description: "Champagne, elderflower, fresh strawberry", 
    image: drink5,
    color: "#F5D76E",
    price: "$24",
    ingredients: ["Champagne", "Elderflower", "Strawberry", "Gold Leaf"]
  },
];

const DrinksSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 0, 200], [-1, 0, 1]);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % drinks.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + drinks.length) % drinks.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isDragging, activeIndex]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = drinks.length;
    
    // Handle wrap-around
    let adjustedDiff = diff;
    if (diff > totalCards / 2) adjustedDiff = diff - totalCards;
    if (diff < -totalCards / 2) adjustedDiff = diff + totalCards;

    const isActive = adjustedDiff === 0;
    const isNext = adjustedDiff === 1;
    const isPrev = adjustedDiff === -1;
    const isFar = Math.abs(adjustedDiff) > 1;

    return {
      x: isActive ? 0 : isPrev ? -320 : isNext ? 320 : adjustedDiff * 320,
      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
      rotateY: isActive ? 0 : isPrev ? 15 : isNext ? -15 : adjustedDiff > 0 ? -25 : 25,
      z: isActive ? 100 : isPrev || isNext ? 50 : 0,
      opacity: isFar ? 0 : isActive ? 1 : 0.6,
      filter: isActive ? 'blur(0px)' : 'blur(2px)',
    };
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -30 : 30,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -30 : 30,
    }),
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-muted/10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          animate={{
            background: `radial-gradient(circle, ${drinks[activeIndex].color}40 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Title Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Decorative Line */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />
            <Sparkles className="w-4 h-4 text-primary" />
            <motion.div 
              className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <motion.span 
            className="text-xs md:text-sm tracking-[0.4em] text-primary/80 uppercase block mb-4"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 0.8 }}
          >
            Cocktail Selection
          </motion.span>
          
          <h2 className="text-section-title text-foreground mb-6 font-brand-serif">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SIGNATURE
            </motion.span>
            {" "}
            <motion.span
              className="inline-block text-primary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              CRAFTS
            </motion.span>
          </h2>
          
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Each pour tells a story. Discover our handcrafted cocktail selection.
          </motion.p>
        </motion.div>
      </div>

      {/* Card Carousel */}
      <div 
        ref={containerRef}
        className="relative z-10 h-[500px] md:h-[600px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Cards Container */}
        <div className="relative w-full max-w-[280px] md:max-w-[340px] h-full">
          <AnimatePresence mode="popLayout" custom={direction}>
            {drinks.map((drink, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={drink.name}
                  custom={direction}
                  initial="enter"
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    zIndex: style.z,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => !isActive && goToSlide(index)}
                  className={`absolute inset-0 cursor-pointer ${!isActive ? 'pointer-events-auto' : ''}`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    filter: style.filter,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);
                    if (info.offset.x > 100) prevSlide();
                    else if (info.offset.x < -100) nextSlide();
                  }}
                >
                  {/* Card */}
                  <motion.div 
                    className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-muted/30 to-background/90 backdrop-blur-xl border border-white/10 shadow-2xl"
                    whileHover={isActive ? { y: -10 } : {}}
                    style={{
                      boxShadow: isActive 
                        ? `0 25px 50px -12px ${drink.color}30, 0 0 0 1px ${drink.color}20` 
                        : '0 25px 50px -12px rgba(0,0,0,0.25)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[55%] overflow-hidden">
                      <motion.img 
                        src={drink.image} 
                        alt={drink.name}
                        className="w-full h-full object-cover"
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      
                      {/* Color Accent */}
                      <motion.div 
                        className="absolute inset-0"
                        animate={{ 
                          background: isActive 
                            ? `linear-gradient(135deg, ${drink.color}20 0%, transparent 50%)`
                            : 'transparent'
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Number Badge */}
                      <motion.div
                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border"
                        style={{ 
                          borderColor: `${drink.color}60`,
                          backgroundColor: `${drink.color}20`,
                          color: drink.color,
                        }}
                        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
                      >
                        0{index + 1}
                      </motion.div>

                      {/* Price Tag */}
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-background/80 backdrop-blur-sm border border-white/20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.2 }}
                      >
                        {drink.price}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 h-[45%] flex flex-col">
                      {/* Category */}
                      <motion.span
                        className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase mb-3"
                        style={{ color: drink.color }}
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
                      >
                        <span className="w-4 h-[1px]" style={{ backgroundColor: drink.color }} />
                        Signature Cocktail
                      </motion.span>

                      {/* Title */}
                      <motion.h3 
                        className="font-brand-serif text-2xl md:text-3xl tracking-wide text-foreground mb-2"
                        animate={isActive ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.7 }}
                      >
                        {drink.name}
                      </motion.h3>
                      
                      {/* Description */}
                      <motion.p 
                        className="text-sm text-muted-foreground mb-4 line-clamp-2"
                        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
                      >
                        {drink.description}
                      </motion.p>

                      {/* Ingredients */}
                      <motion.div 
                        className="flex flex-wrap gap-1.5 mt-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                      >
                        {drink.ingredients.slice(0, 3).map((ingredient, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {drink.ingredients.length > 3 && (
                          <span className="text-[10px] px-2 py-1 text-muted-foreground">
                            +{drink.ingredients.length - 3}
                          </span>
                        )}
                      </motion.div>
                    </div>

                    {/* Bottom Glow Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      animate={{
                        background: isActive 
                          ? `linear-gradient(90deg, transparent, ${drink.color}, transparent)`
                          : 'transparent'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center gap-6 mt-8 md:mt-12"
      >
        {/* Dots */}
        <div className="flex items-center gap-3">
          {drinks.map((drink, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full transition-all duration-500"
                animate={{
                  scale: activeIndex === index ? 1 : 0.7,
                  backgroundColor: activeIndex === index ? drink.color : 'rgba(255,255,255,0.2)',
                }}
              />
              
              {/* Active Ring */}
              {activeIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: drink.color }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-muted/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{
              width: `${((activeIndex + 1) / drinks.length) * 100}%`,
              backgroundColor: drinks[activeIndex].color,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Drink Counter */}
        <div className="flex items-center gap-2 text-sm">
          <motion.span 
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-brand-serif text-2xl"
            style={{ color: drinks[activeIndex].color }}
          >
            0{activeIndex + 1}
          </motion.span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">0{drinks.length}</span>
        </div>

        {/* Active Drink Name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {drinks[activeIndex].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default DrinksSection;

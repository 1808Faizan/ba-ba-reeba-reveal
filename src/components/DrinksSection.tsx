import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
    ingredients: ["Bourbon", "Angostura Bitters", "Orange Peel", "Sugar"]
  },
  { 
    name: "Violet Hour", 
    description: "Gin, violet liqueur, fresh lemon, lavender", 
    image: drink2,
    color: "#9B7BB8",
    ingredients: ["Gin", "Crème de Violette", "Lemon", "Lavender"]
  },
  { 
    name: "Garden Mojito", 
    description: "White rum, mint leaves, lime, cane sugar", 
    image: drink3,
    color: "#7CB882",
    ingredients: ["White Rum", "Fresh Mint", "Lime", "Sugar Cane"]
  },
  { 
    name: "Blood Orange Negroni", 
    description: "Gin, Campari, sweet vermouth, blood orange", 
    image: drink4,
    color: "#E85D4C",
    ingredients: ["Gin", "Campari", "Vermouth", "Blood Orange"]
  },
  { 
    name: "Golden Toast", 
    description: "Champagne, elderflower, fresh strawberry", 
    image: drink5,
    color: "#F5D76E",
    ingredients: ["Champagne", "Elderflower", "Strawberry", "Gold Leaf"]
  },
];

const DrinksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [80, 0]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  const horizontalX = useTransform(horizontalProgress, [0, 1], ["5%", "-55%"]);

  // Magnetic cursor effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative h-[250vh] noise-overlay"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, ${drinks[activeIndex].color}08, transparent 40%)`,
        }}
      />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
        
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Title Section with Reveal Animation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center relative"
          >
            {/* Decorative line */}
            <motion.div 
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
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
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SIGNATURE
              </motion.span>
              {" "}
              <motion.span
                className="inline-block text-primary"
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                CRAFTS
              </motion.span>
            </h2>
            
            <motion.p 
              className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Each pour tells a story. Discover our handcrafted cocktail selection, 
              <br className="hidden md:block" />
              meticulously crafted by our master mixologists.
            </motion.p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container with 3D Cards */}
        <motion.div 
          ref={containerRef}
          style={{ x: horizontalX }}
          className="flex gap-6 md:gap-10 px-6 md:px-12"
        >
          {drinks.map((drink, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative w-72 md:w-96 flex-shrink-0 perspective-1000"
            >
              {/* Glow Ring Behind Card */}
              <motion.div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                style={{ background: `radial-gradient(circle, ${drink.color}40, transparent 70%)` }}
              />

              {/* Main Card */}
              <motion.div 
                whileHover={{ 
                  y: -20, 
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.02,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden bg-gradient-to-b from-muted/20 to-background/80 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:border-primary/40 transition-all duration-700 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image Container */}
                <div className="relative h-[22rem] md:h-[28rem] overflow-hidden">
                  <motion.img 
                    src={drink.image} 
                    alt={drink.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  
                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40" />
                  
                  {/* Color Accent Glow */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{ background: `linear-gradient(135deg, ${drink.color}40, transparent 60%)` }}
                  />

                  {/* Drink Number */}
                  <motion.div
                    className="absolute top-4 left-4 text-6xl md:text-7xl font-brand-serif text-white/5 group-hover:text-white/15 transition-all duration-500"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    0{index + 1}
                  </motion.div>

                  {/* Animated Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="16"
                      fill="none"
                      stroke={drink.color}
                      strokeWidth="1"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      whileHover={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                
                {/* Content */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Category Tag */}
                  <motion.span
                    className="inline-block px-3 py-1 text-[10px] md:text-xs tracking-widest uppercase rounded-full mb-3 border"
                    style={{ 
                      borderColor: `${drink.color}60`,
                      color: drink.color,
                      backgroundColor: `${drink.color}15`
                    }}
                  >
                    Signature
                  </motion.span>

                  <h3 className="font-brand-serif text-2xl md:text-3xl tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
                    {drink.name}
                  </h3>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    {drink.description}
                  </motion.p>

                  {/* Ingredients Pills */}
                  <motion.div 
                    className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                  >
                    {drink.ingredients.map((ingredient, i) => (
                      <motion.span
                        key={i}
                        className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {ingredient}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Corner Accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${drink.color}20 50%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Progress Indicator */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="flex flex-col items-center mt-12 md:mt-16 gap-4"
        >
          {/* Drink Dots */}
          <div className="flex gap-3">
            {drinks.map((drink, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeIndex === index ? 'w-8' : 'w-2'
                }`}
                style={{ 
                  backgroundColor: activeIndex === index ? drink.color : 'rgba(255,255,255,0.2)'
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-48 md:w-64 h-[2px] bg-muted/20 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: horizontalProgress }}
              className="h-full origin-left rounded-full"
              initial={{ backgroundColor: drinks[0].color }}
              animate={{ backgroundColor: drinks[activeIndex].color }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Active Drink Name */}
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
            >
              {drinks[activeIndex].name}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DrinksSection;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import drink1 from '@/assets/drink-1.jpg';
import drink2 from '@/assets/drink-2.jpg';
import drink3 from '@/assets/drink-3.jpg';
import drink4 from '@/assets/drink-4.jpg';
import drink5 from '@/assets/drink-5.jpg';

const drinks = [
  { name: "Old Fashioned", description: "Bourbon, bitters, orange", image: drink1 },
  { name: "Violet Hour", description: "Gin, violet liqueur, lemon", image: drink2 },
  { name: "Garden Mojito", description: "Rum, mint, lime, sugar", image: drink3 },
  { name: "Blood Orange Negroni", description: "Gin, Campari, vermouth", image: drink4 },
  { name: "Golden Toast", description: "Champagne, elderflower, strawberry", image: drink5 },
];

const DrinksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  // Horizontal scroll effect tied to vertical scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  const horizontalX = useTransform(horizontalProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[200vh] noise-overlay"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <motion.h2 
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-section-title text-foreground text-center mb-4"
          >
            SIGNATURE CRAFTS
          </motion.h2>
          <motion.p 
            style={{ opacity: titleOpacity }}
            className="text-muted-foreground text-center max-w-xl mx-auto"
          >
            Each pour tells a story. Discover our handcrafted cocktail selection.
          </motion.p>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div 
          ref={containerRef}
          style={{ x: horizontalX }}
          className="flex gap-8 px-6 md:px-12"
        >
          {drinks.map((drink, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-72 md:w-80 flex-shrink-0"
            >
              {/* Card */}
              <motion.div 
                whileHover={{ y: -10, rotateZ: 1 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-muted/10 border border-muted/20 transition-all duration-500 group-hover:border-primary/50"
              >
                {/* Image */}
                <div className="relative h-96 md:h-[28rem] overflow-hidden">
                  <motion.img 
                    src={drink.image} 
                    alt={drink.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Glow effect on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-primary/5"
                  />
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 border border-primary/30" />
                  </div>
                </div>
                
                {/* Content */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 text-center"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {drink.name}
                  </h3>
                  <motion.p 
                    className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    {drink.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="flex justify-center mt-10"
        >
          <div className="w-48 h-0.5 bg-muted/30 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: horizontalProgress }}
              className="h-full bg-primary origin-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DrinksSection;

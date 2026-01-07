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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.h2 
          style={{ opacity: titleOpacity }}
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

      {/* Horizontal Scroll Carousel */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 px-6 md:px-12 min-w-max">
          {drinks.map((drink, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-64 md:w-72 flex-shrink-0"
            >
              {/* Card */}
              <div className="relative overflow-hidden bg-muted/20 border border-muted/30 transition-all duration-500 group-hover:border-primary/50">
                {/* Image */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img 
                    src={drink.image} 
                    alt={drink.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-primary/10" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-xl md:text-2xl tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {drink.name}
                  </h3>
                  <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {drink.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div 
        style={{ opacity: titleOpacity }}
        className="flex justify-center mt-8 text-muted-foreground text-sm tracking-wider"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          SCROLL TO EXPLORE
        </span>
      </motion.div>
    </section>
  );
};

export default DrinksSection;

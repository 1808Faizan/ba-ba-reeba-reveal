import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import feature1 from '@/assets/feature-1.jpg';
import feature2 from '@/assets/feature-2.jpg';
import feature3 from '@/assets/feature-3.jpg';
import feature4 from '@/assets/feature-4.jpg';

const features = [
  { title: "Brass-topped bar with steel bones", image: feature1 },
  { title: "Velvet corners for whispers", image: feature2 },
  { title: "Jazz, smolder, and slow pours", image: feature3 },
  { title: "Every night feels like a secret", image: feature4 },
];

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden noise-overlay"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.h2 
          style={{ opacity }}
          className="text-section-title text-foreground text-center mb-20"
        >
          LOUNGE
        </motion.h2>

        <div className="space-y-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="divider-line" />
              <div className="py-8 md:py-12 cursor-pointer group">
                <h3 className="text-feature text-center text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
            </motion.div>
          ))}
          <div className="divider-line" />
        </div>

        <motion.div 
          style={{ opacity }}
          className="flex justify-center mt-16"
        >
          <button className="btn-outline-accent">
            Need a hand?
          </button>
        </motion.div>
      </div>

      {/* Hover image reveal */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none z-50 w-64 h-80 overflow-hidden rounded-sm"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 160,
          }}
        >
          <motion.img
            src={features[hoveredIndex].image}
            alt={features[hoveredIndex].title}
            className="w-full h-full object-cover"
            animate={{
              x: (mousePos.x % 20) - 10,
              y: (mousePos.y % 20) - 10,
            }}
            transition={{ duration: 0.1 }}
          />
          <div className="absolute inset-0 border border-primary/30" />
        </motion.div>
      )}
    </section>
  );
};

export default FeaturesSection;

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const brandName = "BABAREEBA";
  const letters = brandName.split('');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Parallax Background image with overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-dark-bottom" />
      <div className="absolute inset-0 bg-background/60" />

      {/* Animated glow orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(38 92% 50% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 w-full mt-20">
        {/* Animated brand name - smaller size, single line */}
        <h1 className="text-hero-brand-sm text-foreground glow-text-subtle mb-6 flex justify-center whitespace-nowrap">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.06,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{ 
                marginRight: '-0.01em',
                display: 'inline-block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
        >
          Behind steel and shadow, you'll find<br />
          a vault for those who live with intention.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="btn-outline-accent">
            Need a hand?
          </button>
          <button className="btn-outline-accent">
            Coming right up!
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

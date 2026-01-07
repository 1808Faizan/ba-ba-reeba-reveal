import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutLeft from '@/assets/about-left.jpg';
import aboutRight from '@/assets/about-right.jpg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values for split animation
  const leftX = useTransform(scrollYProgress, [0.2, 0.5], [0, -100]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.5], [0, 100]);
  const bottomY = useTransform(scrollYProgress, [0.3, 0.6], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Image */}
          <motion.div 
            style={{ x: leftX, opacity }}
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <div className="image-frame w-64 h-80">
              <img 
                src={aboutLeft} 
                alt="Elegant guests at the bar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="image-frame-alt w-52 h-64 -mt-20 ml-20">
              <img 
                src={aboutRight} 
                alt="Bartender crafting cocktails" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="flex-1 text-center max-w-3xl mx-auto">
            <motion.h2 
              style={{ opacity }}
              className="text-section-title text-foreground mb-6"
            >
              BA BA REEBA
            </motion.h2>
            
            <motion.p 
              style={{ x: leftX, opacity }}
              className="text-2xl md:text-3xl font-display text-foreground/90 mb-8"
            >
              isn't just a bar! it's a vault for those who<br />
              live with intention.
            </motion.p>

            <motion.p 
              style={{ y: bottomY, opacity }}
              className="text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Every pour, every playlist, every piece of worn-in furniture is chosen with care. 
              We're not about the noise or the rush—we're about presence. The kind that lingers 
              in a well-crafted drink, a meaningful pause, or a late-night conversation that sticks with you.
            </motion.p>

            <motion.button 
              style={{ opacity }}
              className="btn-outline-accent"
            >
              Curious about us?
            </motion.button>
          </div>

          {/* Right Images */}
          <motion.div 
            style={{ x: rightX, opacity }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          >
            <div className="image-frame-alt w-64 h-80">
              <img 
                src={aboutRight} 
                alt="Premium cocktails" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="image-frame w-52 h-64 -mt-20 mr-20 ml-auto">
              <img 
                src={aboutLeft} 
                alt="Happy guests" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile images */}
        <div className="flex lg:hidden justify-center gap-4 mt-12">
          <motion.div 
            style={{ opacity }}
            className="image-frame w-40 h-52"
          >
            <img src={aboutLeft} alt="Guests" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            style={{ opacity }}
            className="image-frame-alt w-40 h-52"
          >
            <img src={aboutRight} alt="Bartender" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

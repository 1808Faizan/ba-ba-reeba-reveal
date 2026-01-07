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

  const leftImageX = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0]);
  const rightImageX = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 items-center min-h-[70vh]">
          
          {/* Left Images - Stacked & Tilted */}
          <motion.div 
            style={{ x: leftImageX, opacity }}
            className="relative hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative">
              {/* Main image - tilted right */}
              <div className="w-56 h-72 rotate-[6deg] overflow-hidden border-2 border-muted/30 shadow-2xl">
                <img 
                  src={aboutLeft} 
                  alt="Guests enjoying cocktails" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Secondary image - tilted left, overlapping */}
              <div className="absolute -bottom-12 -right-8 w-44 h-56 -rotate-[8deg] overflow-hidden border-2 border-muted/30 shadow-2xl">
                <img 
                  src={aboutRight} 
                  alt="Bar atmosphere" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div 
            style={{ opacity: contentOpacity }}
            className="flex-1 text-center px-4 lg:px-8"
          >
            <h2 className="text-section-title text-foreground mb-6">
              BA BA REEBA
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl font-display text-foreground/90 mb-8 leading-relaxed">
              isn't just a bar! it's a vault for those who<br className="hidden md:block" />
              live with intention.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto text-sm md:text-base">
              Every pour, every playlist, every piece of worn-in furniture is chosen with care. 
              We're not about the noise or the rush—we're about presence. The kind that lingers 
              in a well-crafted drink, a meaningful pause, or a late-night conversation that sticks with you.
            </p>

            <button className="btn-outline-accent">
              Curious about us?
            </button>
          </motion.div>

          {/* Right Images - Stacked & Tilted */}
          <motion.div 
            style={{ x: rightImageX, opacity }}
            className="relative hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative">
              {/* Main image - tilted left */}
              <div className="w-56 h-72 -rotate-[6deg] overflow-hidden border-2 border-muted/30 shadow-2xl">
                <img 
                  src={aboutRight} 
                  alt="Premium cocktails" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Secondary image - tilted right, overlapping */}
              <div className="absolute -bottom-12 -left-8 w-44 h-56 rotate-[8deg] overflow-hidden border-2 border-muted/30 shadow-2xl">
                <img 
                  src={aboutLeft} 
                  alt="Happy guests" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile images */}
        <motion.div 
          style={{ opacity }}
          className="flex lg:hidden justify-center gap-4 mt-12"
        >
          <div className="w-36 h-48 rotate-[4deg] overflow-hidden border-2 border-muted/30 shadow-xl">
            <img src={aboutLeft} alt="Guests" className="w-full h-full object-cover" />
          </div>
          <div className="w-36 h-48 -rotate-[4deg] overflow-hidden border-2 border-muted/30 shadow-xl -mt-4">
            <img src={aboutRight} alt="Bartender" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

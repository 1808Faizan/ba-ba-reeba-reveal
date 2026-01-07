import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const navItems = ['Home', 'About', 'Contact'];
  const legalItems = ['404', 'License', 'Style Guide', 'Changelog'];

  return (
    <footer 
      ref={sectionRef}
      className="relative py-24 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Large brand name */}
        <motion.div 
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <h2 className="text-hero-brand text-foreground glow-text-subtle leading-none">
            BA BA REEBA
          </h2>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          style={{ opacity }}
          className="flex justify-center gap-16 mb-16"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-display text-lg tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        {/* Divider */}
        <motion.div style={{ opacity }} className="divider-line mb-10" />

        {/* Bottom row */}
        <motion.div 
          style={{ opacity }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-muted-foreground tracking-wider">
            © 2026 BA BA REEBA. ALL RIGHTS RESERVED
          </p>
          
          <div className="flex items-center gap-8">
            {legalItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wider uppercase"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;

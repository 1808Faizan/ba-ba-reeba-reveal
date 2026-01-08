import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import aboutLeft from "@/assets/about-left.png";
import aboutRight from "@/assets/about-right.png";
import logo from "@/assets/logo.png";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // NOW: Images start in center → move outward
  const leftImageX = useTransform(scrollYProgress, [0.1, 0.4], [0, -120]);
  const rightImageX = useTransform(scrollYProgress, [0.1, 0.4], [0, 120]);

  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  // Soft floating loop - using proper framer-motion types
  const floatAnimation = {
    y: [-6, 6, -6],
  };
  
  const floatTransition = {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 items-center">

          {/* LEFT IMAGES */}
          <motion.div
            style={{ x: leftImageX, opacity }}
            className="relative hidden lg:flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={floatAnimation}
              transition={floatTransition}
              className="relative"
            >
              <div className="w-56 h-72 rotate-[6deg] overflow-hidden border border-white/20 shadow-xl">
                <img src={aboutLeft} className="w-full h-full object-cover" />
              </div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                className="absolute -bottom-12 -right-8 w-44 h-56 -rotate-[8deg] overflow-hidden border border-white/20 shadow-xl"
              >
                <img src={aboutRight} className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* CENTER CONTENT */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="text-center px-4"
          >
            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-5"
            >
              <motion.img
                src={logo}
                className="h-16 md:h-28 object-contain"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* TITLE */}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              BA BA REEBA
            </h2>

            {/* FORCED TWO-LINE SUBHEAD */}
            <p className="text-lg md:text-2xl font-display text-foreground/90 mb-8 leading-relaxed">
              isn't just a bar — it's a vault for those who
              <br />
              live with intention.
            </p>

            {/* BODY */}
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto text-sm md:text-base">
              Every pour, every playlist, every piece of worn-in furniture is chosen with care.
              We're not about the noise or the rush — we're about presence. The kind that lingers
              in a well-crafted drink, a meaningful pause, or a late-night conversation that stays with you.
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline-accent"
            >
              Curious about us?
            </motion.button>
          </motion.div>

          {/* RIGHT IMAGES */}
          <motion.div
            style={{ x: rightImageX, opacity }}
            className="relative hidden lg:flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={floatAnimation}
              transition={floatTransition}
              className="relative"
            >
              <div className="w-56 h-72 -rotate-[6deg] overflow-hidden border border-white/20 shadow-xl">
                <img src={aboutRight} className="w-full h-full object-cover" />
              </div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                className="absolute -bottom-12 -left-8 w-44 h-56 rotate-[8deg] overflow-hidden border border-white/20 shadow-xl"
              >
                <img src={aboutLeft} className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* MOBILE IMAGES */}
        <motion.div
          style={{ opacity }}
          className="flex lg:hidden justify-center gap-4 mt-12"
        >
          <motion.div
            whileInView={{ y: [30, 0] }}
            transition={{ duration: 0.6 }}
            className="w-36 h-48 rotate-[4deg] overflow-hidden border border-white/20 shadow-xl"
          >
            <img src={aboutLeft} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            whileInView={{ y: [30, 0] }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-36 h-48 -rotate-[4deg] overflow-hidden border border-white/20 shadow-xl -mt-4"
          >
            <img src={aboutRight} className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

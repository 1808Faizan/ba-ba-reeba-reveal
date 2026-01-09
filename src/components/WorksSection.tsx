import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// Food
import food1 from "@/assets/portfolio-1.png";
import food2 from "@/assets/portfolio-2.png";
import food3 from "@/assets/portfolio-3.png";

// Drinks
import drinks1 from "@/assets/portfolio-4.png";
import drinks2 from "@/assets/portfolio-5.png";
import drinks3 from "@/assets/portfolio-6.png";

// Cocktails
import cocktails1 from "@/assets/portfolio-7.png";
import cocktails2 from "@/assets/portfolio-8.png";
import cocktails3 from "@/assets/portfolio-9.png";

// Music
import music1 from "@/assets/portfolio-10.png";
import music2 from "@/assets/portfolio-12.png";
import music3 from "@/assets/portfolio-8.png";

interface Project {
  name: string;
  industry: string;
  timeline: string;
  images: string[];
}

const projects: Project[] = [
  {
    name: "Food",
    industry: "Food",
    timeline: "(23)-(25)",
    images: [food1, food2, food3],
  },
  {
    name: "Drinks",
    industry: "Drinks",
    timeline: "(23)-(25)",
    images: [drinks1, drinks2, drinks3],
  },
  {
    name: "Cocktails",
    industry: "Cocktails",
    timeline: "(24)-(25)",
    images: [cocktails1, cocktails2, cocktails3],
  },
  {
    name: "Music",
    industry: "Music",
    timeline: "(22)-(24)",
    images: [music1, music2, music3],
  },
];


const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group cursor-pointer border-t border-border/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* White Hover Background */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-white pointer-events-none"
      />

      {/* Row Content */}
      <div className="relative z-10 flex items-center justify-between py-10 px-8 md:px-14">
        <span className="text-xs md:text-sm text-muted-foreground w-28 md:w-36">
          {project.industry}
        </span>

        <motion.h3
          animate={{ opacity: isHovered ? 0.3 : 1 }}
          transition={{ duration: 0.25 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display tracking-tight flex-1 text-center"
        >
          {project.name}
        </motion.h3>

        <span className="text-xs md:text-sm text-muted-foreground w-28 md:w-36 text-right">
          {project.timeline}
        </span>
      </div>

      {/* Floating Marquee on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
          >
            <motion.div
              className="flex gap-8 items-center"
              animate={{ x: [0, -1400] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 24,
                  ease: "linear",
                },
              }}
            >
              {[...project.images, ...project.images, ...project.images].map(
                (img, i) => (
                  <div key={i} className="flex items-center gap-6">
                    {/* Rounded Image Capsule */}
                    <div className="w-60 md:w-72 h-32 md:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white border border-black/10">
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>

                    {/* Logo Text */}
                    <span className="text-3xl md:text-5xl font-display text-black/70">
                      {project.name}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WorksSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="flex justify-between px-8 md:px-14 py-6 border-b border-border/20">
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
          Industry
        </span>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
          Timeline
        </span>
      </div>

      {projects.map((project, i) => (
        <ProjectRow key={project.name} project={project} index={i} />
      ))}

      <div className="border-t border-border/20" />
    </section>
  );
};

export default WorksSection;

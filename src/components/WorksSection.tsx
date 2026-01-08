import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Project {
  name: string;
  industry: string;
  timeline: string;
  images: string[];
}

const projects: Project[] = [
  {
    name: "everfit",
    industry: "Fitness",
    timeline: "(23)-(25)",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
    ],
  },
  {
    name: "Sumenki",
    industry: "EdTech",
    timeline: "(23)-(25)",
    images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    ],
  },
  {
    name: "Flux Labs",
    industry: "Blockchain",
    timeline: "(24)-(25)",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&h=400&fit=crop",
    ],
  },
  {
    name: "Mindful",
    industry: "Healthcare",
    timeline: "(22)-(24)",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
    ],
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

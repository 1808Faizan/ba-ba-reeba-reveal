import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reviews = [
  {
    text: "The moment you step in, you feel it—this isn't just a bar, it's a world. BA BA REEBA understands luxury.",
    author: "James Morrison",
    role: "Design Director"
  },
  {
    text: "Every detail whispers sophistication. From the jazz to the pour, it's an experience that stays with you.",
    author: "Elena Vance",
    role: "Creative Strategist"
  },
  {
    text: "If secrets had a home, it would look like this. Intimate, bold, and unforgettable.",
    author: "Marcus Chen",
    role: "Art Curator"
  },
  {
    text: "The kind of place you discover and never want to share. Pure magic in every corner.",
    author: "Sofia Laurent",
    role: "Fashion Editor"
  },
];

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          style={{ opacity: titleOpacity }}
          className="text-section-title text-foreground mb-20"
        >
          THEY SAY
        </motion.h2>

        <div className="space-y-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="review-card max-w-3xl ml-auto"
            >
              <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg font-display text-primary">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg tracking-wide text-foreground">
                    {review.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

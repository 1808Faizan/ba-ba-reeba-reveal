import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import review1 from '@/assets/review-1.jpg';
import review2 from '@/assets/review-2.jpg';
import review3 from '@/assets/review-3.jpg';

const reviews = [
  {
    text: "The moment you step in, you feel it—this isn't just a bar, it's a world. BA BA REEBA understands luxury.",
    image: review1,
  },
  {
    text: "Every detail whispers sophistication. From the jazz to the pour, it's an experience that stays with you.",
    image: review2,
  },
  {
    text: "If secrets had a home, it would look like this. Intimate, bold, and unforgettable.",
    image: review3,
  },
];

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          style={{ opacity: titleOpacity }}
          className="text-section-title text-foreground mb-16 md:mb-24"
        >
          THEY SAY
        </motion.h2>

        <div className="space-y-20 md:space-y-32">
          {reviews.map((review, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: isLeft ? -150 : 150,
                  rotate: isLeft ? -3 : 3
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: isLeft ? -2 : 2
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className={`relative ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                style={{
                  maxWidth: '85%',
                }}
              >
                {/* Image with review overlay */}
                <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden shadow-2xl">
                  <img 
                    src={review.image} 
                    alt="Guest experience" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  
                  {/* Review text on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <p className="text-lg md:text-2xl lg:text-3xl font-display text-foreground leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

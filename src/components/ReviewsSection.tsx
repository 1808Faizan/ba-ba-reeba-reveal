import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import review1 from '@/assets/img-1.jpg';
import review2 from '@/assets/img-2.jpg';
import review3 from '@/assets/img-3.jpg';

const reviews = [
  {
    text: "The moment you step in, you feel it—this isn't just a bar, it's a world. BA BA REEBA understands luxury.",
    image: review1,
    direction: 'left' as const,
  },
  {
    text: "Every detail whispers sophistication. From the jazz to the pour, it's an experience that stays with you.",
    image: review2,
    direction: 'right' as const,
  },
  {
    text: "If secrets had a home, it would look like this. Intimate, bold, and unforgettable.",
    image: review3,
    direction: 'left' as const,
  },
];

const ReviewsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate which review should be visible based on scroll progress
  const review1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.35], [0, 1, 1, 0]);
  const review1X = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.35], [-200, 0, 0, -200]);
  
  const review2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const review2X = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.65], [200, 0, 0, 200]);
  
  const review3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 1]);
  const review3X = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [-200, 0, 0, 0]);

  const reviewAnimations = [
    { opacity: review1Opacity, x: review1X },
    { opacity: review2Opacity, x: review2X },
    { opacity: review3Opacity, x: review3X },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-section-title text-1xl text-foreground mb-12 md:mb-16 text-center"
          >
what they say's          </motion.h2>

          {/* Reviews container - stacked on top of each other */}
          <div className="relative h-[60vh] flex items-center justify-center">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                style={{ 
                  opacity: reviewAnimations[index].opacity,
                  x: reviewAnimations[index].x,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Image with review overlay */}
                <div 
                  className={`relative w-full max-w-4xl aspect-[16/10] overflow-hidden shadow-2xl ${
                    review.direction === 'left' ? 'rotate-[-2deg]' : 'rotate-[2deg]'
                  }`}
                >
                  <img 
                    src={review.image} 
                    alt="Guest experience" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                  
                  {/* Review text on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <p className="text-lg md:text-2xl lg:text-3xl font-display text-foreground leading-relaxed text-center">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => {
              const dotOpacity = [review1Opacity, review2Opacity, review3Opacity][index];
              return (
                <motion.div
                  key={index}
                  style={{ opacity: dotOpacity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

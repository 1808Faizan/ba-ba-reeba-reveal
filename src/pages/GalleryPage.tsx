import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

import portfolio1 from '@/assets/portfolio-1.png';
import portfolio2 from '@/assets/portfolio-2.png';
import portfolio3 from '@/assets/portfolio-3.png';
import portfolio4 from '@/assets/portfolio-4.png';
import portfolio5 from '@/assets/portfolio-5.png';
import portfolio6 from '@/assets/portfolio-6.png';
import portfolio7 from '@/assets/portfolio-7.png';
import portfolio8 from '@/assets/portfolio-8.png';
import portfolio9 from '@/assets/portfolio-9.png';
import portfolio10 from '@/assets/portfolio-10.png';
import portfolio11 from '@/assets/portfolio-11.png';
import portfolio12 from '@/assets/portfolio-12.png';

const images = [
  { src: portfolio1, alt: "Interior ambiance" },
  { src: portfolio2, alt: "Cocktail crafting" },
  { src: portfolio3, alt: "Bar atmosphere" },
  { src: portfolio4, alt: "Premium spirits" },
  { src: portfolio5, alt: "Lounge seating" },
  { src: portfolio6, alt: "Signature drinks" },
  { src: portfolio7, alt: "Evening vibes" },
  { src: portfolio8, alt: "Bartender at work" },
  { src: portfolio9, alt: "Premium experience" },
  { src: portfolio10, alt: "Night scene" },
  { src: portfolio11, alt: "Cocktail details" },
  { src: portfolio12, alt: "BA BA REEBA moments" },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-display tracking-wider mb-4">GALLERY</h1>
          <p className="text-muted-foreground text-lg">Moments captured in time</p>
        </motion.div>
      </section>

      {/* Gallery Grid - Masonry style */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                onClick={() => setSelectedImage(image.src)}
                className="relative overflow-hidden cursor-pointer group mb-3 md:mb-4 break-inside-avoid"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-foreground text-sm tracking-wider">VIEW</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Link */}
      <div className="text-center pb-20">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;

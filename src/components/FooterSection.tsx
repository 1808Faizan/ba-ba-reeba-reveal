import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import logo from "@/assets/logo.png";
import logoHover from "@/assets/logo-2.png";
import ReservationModal from './ReservationModal';

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Career', path: '/contact' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
  ];

  return (
    <>
      <footer 
        ref={sectionRef}
        className="relative py-24 overflow-hidden noise-overlay"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Large brand name */}
          <motion.div 
            style={{ opacity, scale }}
            className="text-center mb-20 flex flex-col items-center gap-4 group"
          >
            {/* Logo wrapper */}
            <div className="relative w-12 sm:w-14 md:w-20 lg:w-32">
              {/* Default logo */}
              <img
                src={logo}
                alt="Ba Ba Reeba Logo"
                className="w-full transition-opacity duration-200 group-hover:opacity-0"
              />
              {/* Hover logo */}
              <img
                src={logoHover}
                alt="Ba Ba Reeba Hover Logo"
                className="absolute inset-0 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>

            {/* Text */}
            <h2 className="font-brand-serif text-foreground glow-text-subtle leading-none text-[10vw] md:text-[8vw] tracking-[0.15em]">
              BABAREEBA
            </h2>
          </motion.div>

          {/* Navigation with Reservation */}
          <motion.nav
            style={{ opacity }}
            className="flex flex-wrap justify-center gap-x-7 gap-y-4 mb-10 md:flex-nowrap md:gap-16"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="font-display text-base md:text-lg tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="font-display text-base md:text-lg tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
            >
              Reservation
            </button>
          </motion.nav>

          {/* Social Media Icons */}
          <motion.div
            style={{ opacity }}
            className="flex justify-center gap-6 mb-16"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div style={{ opacity }} className="divider-line mb-10" />

          {/* Bottom row */}
          <motion.div 
            style={{ opacity }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-muted-foreground tracking-wider">
              © 2026 BA BA REEBA. ALL RIGHTS RESERVED BY PTS
            </p>
            
            <div className="flex items-center gap-8">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wider uppercase"
              >
                Privacy & Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wider uppercase"
              >
                Terms Of Services
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>

      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </>
  );
};

export default FooterSection;

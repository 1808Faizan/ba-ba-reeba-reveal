import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import logo2 from "@/assets/logo-2.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

  const navItems = [
    { name: "Home", href: "#home", isRoute: false },
    { name: "Menu", href: "#about", isRoute: false },
    { name: "Reservation", href: "/menu", isRoute: true },
    { name: "Gallery", href: "#lounge", isRoute: false },
    { name: "Contact", href: "#lounge", isRoute: false },

  ];

  const handleClose = () => setOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">

        {/* LOGO with hover swap */}
        <div
          className="relative h-8 md:h-14 w-auto cursor-pointer"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        >
          <AnimatePresence mode="wait">
            {!hoverLogo ? (
              <motion.img
                key="logo1"
                src={logo}
                alt="Babareeba Logo"
                className="h-8 md:h-14 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            ) : (
              <motion.img
                key="logo2"
                src={logo2}
                alt="Babareeba Logo Hover"
                className="h-8 md:h-14 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            >
              {item.isRoute ? (
                <Link
                  to={item.href}
                  className="text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                >
                  {item.name}
                </a>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-foreground"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center px-6 py-5">
              <span className="font-display text-lg tracking-widest text-foreground">
                BABAREEBA
              </span>

              <button onClick={handleClose} className="text-foreground">
                <X size={28} />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-col items-center gap-8"
            >
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={handleClose}
                      className="text-2xl tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={handleClose}
                      className="text-2xl tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

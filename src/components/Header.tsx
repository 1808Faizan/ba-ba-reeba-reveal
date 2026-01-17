import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import logo2 from "@/assets/logo-2.png";
import ReservationModal from "./ReservationModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Menu", href: "/menu", isRoute: true },
    { name: "Reservation", href: "#", isRoute: false, isReservation: true },
    { name: "Gallery", href: "/gallery", isRoute: true },
    { name: "Contact", href: "/contact", isRoute: true },
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
                className="h-14 md:h-16 object-contain"
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
                className="h-14 md:h-16
                 object-contain"
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
              {item.isReservation ? (
                <button
                  onClick={() => setReservationOpen(true)}
                  className="text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                >
                  {item.name}
                </button>
              ) : item.isRoute ? (
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

        {/* Mobile: Reservation Button + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setReservationOpen(true)}
            className="text-xs font-medium tracking-wider text-foreground uppercase border border-foreground/30 px-3 py-1.5 hover:bg-foreground/10 transition-colors"
          >
            Reserve
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-foreground"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Reservation Modal */}
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

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
                  {item.isReservation ? (
                    <button
                      onClick={() => {
                        handleClose();
                        setReservationOpen(true);
                      }}
                      className="text-2xl tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                    >
                      {item.name}
                    </button>
                  ) : item.isRoute ? (
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

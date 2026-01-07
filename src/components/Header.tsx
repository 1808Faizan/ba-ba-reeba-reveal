import { motion } from 'framer-motion';

const Header = () => {
  const navItems = ['Home', 'About', 'Menu', 'Lounge'];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <span className="font-display text-lg tracking-widest text-foreground">
          BA BA REEBA
        </span>
        
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;

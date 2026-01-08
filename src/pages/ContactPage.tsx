import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const ContactPage = () => {
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
          <h1 className="text-5xl md:text-7xl font-display tracking-wider mb-4">CONTACT</h1>
          <p className="text-muted-foreground text-lg">We'd love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-display tracking-wider mb-8">GET IN TOUCH</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground font-medium">Address</p>
                      <p className="text-muted-foreground">123 Speakeasy Lane, Downtown District</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground font-medium">Email</p>
                      <p className="text-muted-foreground">hello@babareeba.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground font-medium">Hours</p>
                      <p className="text-muted-foreground">Tue - Sun: 6PM - 2AM</p>
                      <p className="text-muted-foreground">Closed Mondays</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-foreground font-medium mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 border border-muted/30 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 border border-muted/30 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display tracking-wider mb-8">SEND A MESSAGE</h2>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline-accent w-full"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="text-center pb-20">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;

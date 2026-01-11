import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-brand-serif text-4xl md:text-6xl text-foreground mb-12 tracking-wider"
          >
            Privacy & Policy
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none space-y-8 text-muted-foreground"
          >
            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Information We Collect</h2>
              <p>
                At Ba Ba Reeba, we collect information you provide directly to us, such as when you make a reservation, 
                sign up for our newsletter, or contact us with inquiries. This may include your name, email address, 
                phone number, and dining preferences.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to process your reservations, communicate with you about your dining 
                experience, send you promotional materials (with your consent), and improve our services.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your 
                consent, except as necessary to provide our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized 
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@babareeba.com
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPage;

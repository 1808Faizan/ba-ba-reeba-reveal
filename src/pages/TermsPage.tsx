import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const TermsPage = () => {
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
            Terms Of Services
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none space-y-8 text-muted-foreground"
          >
            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using Ba Ba Reeba's website and services, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Reservations</h2>
              <p>
                Reservations are subject to availability. We reserve the right to cancel or modify reservations in 
                case of unforeseen circumstances. Please arrive on time for your reservation; tables may be released 
                after 15 minutes.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Conduct</h2>
              <p>
                We expect all guests to conduct themselves in a respectful manner. Management reserves the right to 
                refuse service to anyone who violates our policies or behaves inappropriately.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of Ba Ba Reeba 
                and is protected by copyright and trademark laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Limitation of Liability</h2>
              <p>
                Ba Ba Reeba shall not be liable for any direct, indirect, incidental, or consequential damages arising 
                from the use of our services or website.
              </p>
            </section>

            <section>
              <h2 className="font-brand-serif text-2xl text-foreground mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting to this website.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default TermsPage;

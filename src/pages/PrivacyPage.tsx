import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12 font-antipoda">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-antipoda text-4xl md:text-6xl text-foreground mb-6 tracking-wider"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-antipoda text-muted-foreground mb-12 text-lg"
          >
            This Privacy Policy explains how Ba Ba Reeba handles the personal data we collect from our guests.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none space-y-10 text-muted-foreground font-antipoda"
          >
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Information Collection</h2>
              <p>
                We collect personal information that you voluntarily provide to us when making reservations, 
                signing up for our loyalty programs, or contacting us through our website. This information 
                may include:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Full name</li>
                <li>Contact phone numbers</li>
                <li>Email addresses</li>
                <li>Date of birth (for age verification purposes)</li>
                <li>Reservation preferences and special requests</li>
              </ul>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Use of Data</h2>
              <p>
                The personal data we collect is used for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Reservation confirmation and management</li>
                <li>Communication regarding your bookings</li>
                <li>Enrollment and management of loyalty programs</li>
                <li>Occasional marketing communications via SMS or Email (with your consent)</li>
                <li>Improving our services and guest experience</li>
                <li>Compliance with legal obligations</li>
              </ul>
              <p className="mt-4">
                You may opt out of marketing communications at any time by contacting us or using the 
                unsubscribe option in our emails.
              </p>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">CCTV Surveillance</h2>
              <p>
                For the safety and security of our guests and staff, our premises are under <strong className="text-foreground">24/7 CCTV 
                surveillance</strong>. By entering Ba Ba Reeba, you acknowledge and consent to being recorded 
                by our security cameras. CCTV footage is:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Used solely for security and safety purposes</li>
                <li>Stored securely and accessed only by authorized personnel</li>
                <li>Retained for a limited period as per legal requirements</li>
                <li>May be shared with law enforcement if required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Third-Party Sharing</h2>
              <p>
                Ba Ba Reeba is committed to protecting your privacy. <strong className="text-foreground">We do not sell, trade, or 
                otherwise transfer your personal data to third parties</strong> for their marketing purposes. 
                We may share your information only with:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Service providers who assist in our operations (under strict confidentiality agreements)</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Payment processors for secure transaction handling</li>
              </ul>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Photography & Media</h2>
              <p>
                By entering Ba Ba Reeba, you acknowledge and consent that:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>You may be photographed or filmed during events and regular operations</li>
                <li>Such photographs or videos may be used for promotional purposes on our social media 
                    channels, website, and marketing materials</li>
                <li>Professional photography sessions may take place during special events</li>
              </ul>
              <p className="mt-4">
                If you do not wish to be photographed, please inform our staff, and we will make reasonable 
                efforts to accommodate your request.
              </p>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights, 
                please contact us at:
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Email:</strong> privacy@babareeba.com<br />
                <strong className="text-foreground">Phone:</strong> +91 XX XXXX XXXX
              </p>
            </section>

            <section className="border-t border-muted-foreground/20 pt-8 mt-12">
              <p className="text-sm text-muted-foreground/70">
                Last updated: February 2026
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

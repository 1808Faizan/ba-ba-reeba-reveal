import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const TermsPage = () => {
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
            Terms Of Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-antipoda text-muted-foreground mb-12 text-lg"
          >
            This page acts as a legal contract between Ba Ba Reeba and our guests. By entering our premises, 
            you agree to abide by the following terms and conditions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none space-y-10 text-muted-foreground font-antipoda"
          >
            {/* Admission Policy */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Admission Policy</h2>
              <p>
                Entry to Ba Ba Reeba is subject to the following requirements:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-foreground">Age Requirement:</strong> Guests must be 21 years of age or older to enter. 
                    This is in compliance with local Maharashtra laws regarding licensed premises.</li>
                <li><strong className="text-foreground">Valid ID Required:</strong> All guests must present a valid government-issued 
                    photo identification (Aadhaar Card, Passport, Driving License, or Voter ID) at the entrance.</li>
                <li><strong className="text-foreground">Right of Admission:</strong> Management reserves the right to refuse entry 
                    to any individual without providing a reason.</li>
              </ul>
            </section>

            {/* Dress Code */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Dress Code – "Club Pride" Standard</h2>
              <p>
                To maintain the sophisticated atmosphere of Ba Ba Reeba, we enforce a <strong className="text-foreground">Smart Casual</strong> dress code:
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Acceptable Attire:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Collared shirts, polo shirts</li>
                    <li>Smart jeans or trousers</li>
                    <li>Closed-toe shoes or smart footwear</li>
                    <li>Blazers and jackets</li>
                    <li>Cocktail dresses, elegant evening wear</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Not Permitted:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Flip-flops or slippers</li>
                    <li>Sportswear or athletic clothing</li>
                    <li>Torn or excessively distressed clothing</li>
                    <li>Sleeveless vests for men</li>
                    <li>Beachwear</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                Management's decision on dress code compliance is final.
              </p>
            </section>

            {/* Behavior & Conduct */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Behavior & Conduct – Zero Tolerance Policy</h2>
              <p>
                Ba Ba Reeba is committed to providing a safe and enjoyable environment for all guests. 
                We maintain a <strong className="text-foreground">Zero Tolerance Policy</strong> regarding:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-foreground">Harassment:</strong> Any form of harassment, including verbal, physical, 
                    or sexual harassment towards guests or staff will result in immediate removal.</li>
                <li><strong className="text-foreground">Illegal Substances:</strong> Possession, consumption, or distribution of 
                    illegal drugs or substances is strictly prohibited and will be reported to authorities.</li>
                <li><strong className="text-foreground">Aggressive Behavior:</strong> Fighting, threatening behavior, or any form 
                    of violence will not be tolerated.</li>
                <li><strong className="text-foreground">Property Damage:</strong> Guests will be held liable for any damage 
                    caused to the premises or property.</li>
              </ul>
              <p className="mt-4 p-4 bg-muted/30 rounded-lg border border-muted-foreground/20">
                <strong className="text-foreground">Notice:</strong> Management reserves the right to remove any guest violating 
                these policies without warning and without refund of any entry fees or reservations.
              </p>
            </section>

            {/* Table Reservations */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Table Reservations</h2>
              <p>
                The following policies apply to all table reservations at Ba Ba Reeba:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-foreground">Confirmation:</strong> All reservations must be confirmed via phone or 
                    email at least 2 hours before the scheduled time.</li>
                <li><strong className="text-foreground">Late Arrivals:</strong> Tables will be held for a maximum of 
                    <strong> 15 minutes</strong> past the reservation time. After this, the reservation may be released 
                    without notice.</li>
                <li><strong className="text-foreground">No-Shows:</strong> Failure to arrive without prior cancellation may 
                    result in being blocked from future reservations.</li>
                <li><strong className="text-foreground">Cancellation:</strong> Cancellations must be made at least 24 hours 
                    in advance. Late cancellations may incur a cancellation fee.</li>
                <li><strong className="text-foreground">Minimum Spends:</strong> Certain tables or VIP areas may require a 
                    minimum spend, which will be communicated at the time of booking.</li>
              </ul>
            </section>

            {/* Cover Charges & Entry */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Cover Charges & Entry Fees</h2>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-foreground">Cover Charge:</strong> Entry fees, when applicable, may be "full cover" 
                    (redeemable against food and beverages) or standard entry fee. This will be clearly communicated.</li>
                <li><strong className="text-foreground">Special Events:</strong> Cover charges may vary for special events, 
                    themed nights, or performances.</li>
                <li><strong className="text-foreground">Guest List:</strong> Pre-registration on our guest list may offer 
                    reduced or waived entry fees on select nights.</li>
              </ul>
            </section>

            {/* Refund Policy */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Refund Policy</h2>
              <p>
                Ba Ba Reeba operates a <strong className="text-foreground">No Refund Policy</strong> on:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Entry tickets and cover charges once inside the premises</li>
                <li>Pre-booked table reservations with less than 24 hours' notice</li>
                <li>Prepaid packages or event tickets</li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">Rescheduling:</strong> We may offer a one-time rescheduling option if you 
                inform us at least 24 hours in advance of your reservation.
              </p>
            </section>

            {/* Outside Food & Drinks */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Outside Food & Beverages</h2>
              <p>
                For health, safety, and licensing reasons, <strong className="text-foreground">bringing outside food or beverages 
                into Ba Ba Reeba is strictly prohibited</strong>. Any outside consumables found will be confiscated at the entrance.
              </p>
            </section>

            {/* Smoking Policy */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Smoking Policy</h2>
              <p>
                In compliance with local regulations:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Smoking is only permitted in designated smoking zones</li>
                <li>Smoking inside the main lounge area is strictly prohibited</li>
                <li>E-cigarettes and vaping devices are subject to the same restrictions</li>
              </ul>
            </section>

            {/* Liability */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Liability Disclaimer</h2>
              <p>
                Ba Ba Reeba and its management:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-foreground">Are not responsible</strong> for any loss, theft, or damage to personal 
                    belongings, valuables, or vehicles parked on or near the premises.</li>
                <li>Are not liable for any injuries sustained on the premises unless caused by proven negligence.</li>
                <li>Recommend guests to keep their belongings secure and not leave valuables unattended.</li>
              </ul>
              <p className="mt-4">
                Guests are advised to use the cloakroom facilities, where available, at their own risk.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Changes to Terms</h2>
              <p>
                Ba Ba Reeba reserves the right to modify, update, or change these Terms of Services at any time 
                without prior notice. Changes will be effective immediately upon posting to this website. 
                Continued use of our services or entry to our premises constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-antipoda text-2xl text-foreground mb-4">Contact Us</h2>
              <p>
                For any questions regarding these Terms of Services, please contact us at:
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Email:</strong> info@babareeba.com<br />
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

export default TermsPage;

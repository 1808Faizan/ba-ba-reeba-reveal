import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

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
          <h1 className="text-5xl md:text-7xl font-display tracking-wider mb-4">RESERVATION</h1>
          <p className="text-muted-foreground text-lg">Reserve your experience</p>
        </motion.div>
      </section>

      {/* Reservation Form */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="border border-muted/30 p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg tracking-wider mb-2">OPEN</h3>
                <p className="text-sm text-muted-foreground">Tue - Sun</p>
              </div>
              <div className="border border-muted/30 p-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg tracking-wider mb-2">HOURS</h3>
                <p className="text-sm text-muted-foreground">6PM - 2AM</p>
              </div>
              <div className="border border-muted/30 p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg tracking-wider mb-2">CAPACITY</h3>
                <p className="text-sm text-muted-foreground">Up to 12 guests</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-muted/30 px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-muted/30 px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  >
                    <option value="">Select time</option>
                    {['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Occasion</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full bg-background border border-muted/30 px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                >
                  <option value="">Select occasion (optional)</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meeting</option>
                  <option value="date">Date Night</option>
                  <option value="celebration">Celebration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Special Requests</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any dietary restrictions, seating preferences, or special requests..."
                  className="w-full bg-transparent border border-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-outline-accent w-full"
              >
                Request Reservation
              </motion.button>

              <p className="text-sm text-muted-foreground text-center">
                Reservations are confirmed via email within 24 hours.
              </p>
            </form>
          </motion.div>
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

export default ReservationPage;

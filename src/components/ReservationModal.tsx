import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const restaurants = [
  { id: "babareeba-pune", name: "Ba Ba Reeba", location: "Pune" },
  { id: "babareeba-mumbai", name: "Ba Ba Reeba", location: "Mumbai" },
  { id: "babareeba-delhi", name: "Ba Ba Reeba", location: "Delhi" },
];

const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

const ageRanges = ["18-25", "26-35", "36-45", "46-55", "55+"];

const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurant: "",
    guests: "2",
    date: new Date(),
    timeSlot: "",
    termsAccepted: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ageRange: "",
    pincode: "",
    specialRequests: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Reservation submitted:", formData);
    onClose();
    setStep(1);
  };

  const getRestaurantDisplay = () => {
    const r = restaurants.find((r) => r.id === formData.restaurant);
    return r ? `${r.name} ${r.location}` : "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F5D6A8] text-[#1a1a1a] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display tracking-wide mb-8">
                      Make A Reservation
                    </h2>

                    {/* Restaurant Select */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Restaurant</label>
                      <select
                        value={formData.restaurant}
                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                        className="w-full p-4 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                      >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} - {r.location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guests & Date */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Guests</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full p-4 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="w-full p-4 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] text-left focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20">
                              {format(formData.date, "dd-MMM-yyyy")}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#FFF8EC]" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.date}
                              onSelect={(date) => date && setFormData({ ...formData, date })}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {!formData.restaurant && (
                      <p className="text-center text-[#1a1a1a]/60 mb-6">
                        Please select a restaurant to see available time slots
                      </p>
                    )}

                    {/* Continue Button */}
                    <button
                      onClick={handleNext}
                      disabled={!formData.restaurant}
                      className="flex items-center justify-center gap-2 mx-auto text-lg font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display tracking-wide mb-6">
                      Make A Reservation
                    </h2>

                    {/* Restaurant Display */}
                    <div className="w-full p-4 bg-[#FFF8EC] rounded-sm mb-4">
                      <span className="font-semibold">{getRestaurantDisplay()}</span>
                    </div>

                    {/* Guests & Date Display */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-[#FFF8EC] rounded-sm">
                        <span className="text-sm text-[#1a1a1a]/60 block mb-1">Guests</span>
                        <span>{formData.guests}</span>
                      </div>
                      <div className="p-4 bg-[#FFF8EC] rounded-sm">
                        <span className="text-sm text-[#1a1a1a]/60 block mb-1">Date</span>
                        <span>{format(formData.date, "dd-MMM-yyyy")}</span>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <h3 className="text-xl font-display tracking-wide mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={cn(
                            "p-3 border-2 rounded-sm text-sm font-medium transition-all",
                            formData.timeSlot === slot
                              ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                              : "bg-[#FFF8EC] border-[#E8D5B8] text-[#1a1a1a] hover:border-[#1a1a1a]"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    {/* Terms */}
                    <div className="mb-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <div
                          onClick={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
                          className={cn(
                            "w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                            formData.termsAccepted
                              ? "bg-[#1a1a1a] border-[#1a1a1a]"
                              : "bg-[#FFF8EC] border-[#1a1a1a]/30"
                          )}
                        >
                          {formData.termsAccepted && <Check size={14} className="text-white" />}
                        </div>
                        <div>
                          <span className="font-semibold">Restaurant Terms & Conditions</span>
                          <span className="text-[#1a9a9a] ml-2 text-sm">Click here for additional details</span>
                        </div>
                      </label>
                      {formData.termsAccepted && (
                        <ul className="mt-3 ml-8 text-sm text-[#1a1a1a]/80 space-y-1 list-disc">
                          <li><strong>Dress Code:</strong> Smart Casual. Men, please note regrettably no open sandals/shoes.</li>
                          <li><strong>Cover Charges:</strong> Deposit/Cover Charge is not required for children below 15 years.</li>
                          <li><strong>Kids Policy:</strong> Thursday, Friday & Saturday Post 11:00 PM Guests below 21 Years not allowed.</li>
                        </ul>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-lg font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
                      >
                        <ArrowLeft size={20} /> Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.timeSlot || !formData.termsAccepted}
                        className="flex items-center gap-2 text-lg font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continue <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display tracking-wide mb-2">
                      Reservation Details
                    </h2>
                    <p className="text-[#1a1a1a]/70 mb-6">
                      {getRestaurantDisplay()},<br />
                      {format(formData.date, "EEEE, MMMM d")}, at {formData.timeSlot}<br />
                      Table for {formData.guests}
                    </p>

                    <div className="h-px bg-[#1a1a1a]/20 mb-6" />

                    <h3 className="text-xl font-display tracking-wide mb-4">Personal details</h3>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        />
                      </div>
                    </div>

                    {/* Age Range & Pincode */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Age Range</label>
                        <select
                          value={formData.ageRange}
                          onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        >
                          <option value="">Select Age Range</option>
                          {ageRanges.map((age) => (
                            <option key={age} value={age}>{age}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pincode</label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20"
                        />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Special requests (We will do our best to accommodate them)
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value.slice(0, 200) })}
                        rows={3}
                        className="w-full p-3 bg-[#FFF8EC] border-none rounded-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 resize-none"
                      />
                      <p className="text-right text-sm text-[#1a1a1a]/60 mt-1">
                        {formData.specialRequests.length}/200 characters
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-lg font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
                      >
                        <ArrowLeft size={20} /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.firstName || !formData.email || !formData.phone}
                        className="flex items-center gap-2 text-lg font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Confirm Reservation <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;

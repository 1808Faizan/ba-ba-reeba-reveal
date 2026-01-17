import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronRight, MapPin, Clock, DollarSign, Sparkles, Zap, Target, Heart, Star, Mail, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import emailjs from '@emailjs/browser';

// Job positions data
const jobPositions = [
  { id: 1, title: "Head Bartender", department: "Bar Operations", location: "New Delhi, India", type: "Full-time", salary: "$70,000 - $90,000", description: "Lead our bar team...", requirements: ["5+ years bartending experience", "Leadership skills"], benefits: ["Health insurance", "Paid time off"], icon: <Sparkles />, accentColor: "bg-black/20 border-primary/30" },
  { id: 2, title: "Mixologist", department: "Bar Operations", location: "New Delhi, India", type: "Full-time", salary: "$55,000 - $75,000", description: "Craft innovative cocktails...", requirements: ["3+ years experience"], benefits: ["Health insurance", "Training programs"], icon: <Zap />, accentColor: "bg-black/20 border-primary/30" },
  { id: 3, title: "Bar Manager", department: "Management", location: "New Delhi, India", type: "Full-time", salary: "$75,000 - $100,000", description: "Oversee all bar operations...", requirements: ["7+ years industry experience"], benefits: ["Full benefits package", "Bonus potential"], icon: <Target />, accentColor: "bg-black/20 border-[#da8848]/40" },
  { id: 4, title: "Server", department: "Front of House", location: "New Delhi, India", type: "Part-time/Full-time", salary: "$45,000 - $65,000 + tips", description: "Provide exceptional table service...", requirements: ["2+ years serving experience"], benefits: ["Flexible scheduling", "Tips"], icon: <Heart />, accentColor: "bg-black/20 border-[#da8848]/40" },
];

const CareerPage = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobPositions[0] | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const jobsRef = useRef(null);
  const jobsInView = useInView(jobsRef, { once: true, margin: "-100px" });
  
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleApply = (jobId: number) => {
    const job = jobPositions.find(j => j.id === jobId);
    setSelectedJob(job || null);
    setIsApplying(true);
    setResumeFile(null);
    setError(null);
    setSuccess(false);
  };

  const filteredJobs = activeFilter === 'all'
    ? jobPositions
    : jobPositions.filter(job => job.department.toLowerCase() === activeFilter.toLowerCase());

  const handleResumeDownload = () => {
    if (!resumeFile) return;
    const url = URL.createObjectURL(resumeFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = resumeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmitApplication = async () => {
    if (!formRef.current || !resumeFile || !selectedJob) {
      setError("Please upload your resume.");
      return;
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setSending(true);
    setError(null);

    try {
      await emailjs.sendForm(
        "service_0zo331s",   // ← Replace with your EmailJS Service ID
        "template_p84k95w",  // ← Replace with your EmailJS Template ID
        formRef.current,
        "JHV5AZtVqrnRzUjBG"    // ← Replace with your EmailJS Public Key
      );

      setSuccess(true);
      setResumeFile(null);

      setTimeout(() => {
        setIsApplying(false);
        setSelectedJob(null);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to send application. Check your EmailJS credentials.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="relative z-10 text-center max-w-3xl">
          <motion.h1 className="text-5xl md:text-6xl font-display mb-4">CAREERS</motion.h1>
          <motion.p className="text-muted-foreground text-lg md:text-xl">Join our team of passionate hospitality professionals</motion.p>
        </motion.div>
      </section>

      {/* Job Cards */}
      <section ref={jobsRef} className="py-12 md:py-16 px-4 sm:px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-4 px-4">
            <div className="flex space-x-2 min-w-max">
              {['all', 'Bar Operations', 'Management', 'Front of House', 'Events'].map(filter => (
                <motion.button key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm md:text-base rounded-full whitespace-nowrap transition-colors ${
                    activeFilter === filter ? 'bg-[#da8848] text-black' : 'bg-black text-foreground/80 border border-border hover:border-[#da8848]/50'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <motion.div key={job.id} whileHover={{ y: -4, scale: 1.01, transition: { type: "spring", stiffness: 200 } }} className="relative group">
                <div className="bg-black border border-border rounded-xl overflow-hidden">
                  <div className={`p-4 md:p-6 cursor-pointer ${job.accentColor} border-l-4`} onClick={() => handleApply(job.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div whileHover={{ rotate: 5, scale: 1.05 }} className={`w-12 h-12 rounded-lg ${job.accentColor} flex items-center justify-center`}>
                            {job.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold">{job.title}</h3>
                            <p className="text-muted-foreground text-sm">{job.department}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm md:text-base line-clamp-2">{job.description}</p>
                      </div>
                      <ChevronRight className="text-muted-foreground hidden md:block" size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && isApplying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-black border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              
              {/* Header */}
              <div className="sticky top-0 bg-black border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">{selectedJob.title}</h2>
                  <p className="text-muted-foreground text-sm">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <X className="cursor-pointer" size={24} onClick={() => { setIsApplying(false); setSelectedJob(null); }} />
              </div>

              {/* ✅ EmailJS FORM */}
              <form ref={formRef} className="p-4 md:p-6 bg-black" onSubmit={(e) => { e.preventDefault(); handleSubmitApplication(); }}>
                <input type="hidden" name="job_title" value={selectedJob.title} />
                <input type="hidden" name="job_department" value={selectedJob.department} />
                <input type="hidden" name="job_location" value={selectedJob.location} />
                <input type="hidden" name="message" value={`Applying for ${selectedJob.title} position`} />

                {/* Resume Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Upload Resume (PDF, DOC, DOCX, max 5MB)</label>
                  <div className="relative">
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-black hover:border-[#da8848]/60 transition">
                      <span className="text-sm text-muted-foreground truncate">{resumeFile ? resumeFile.name : "Choose your resume file"}</span>
                      <span className="text-xs px-3 py-1 bg-[#da8848] text-black rounded-md">Browse</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {resumeFile && (
                    <motion.button type="button" onClick={handleResumeDownload} className="flex-1 px-4 py-3 border border-[#da8848]/60 text-[#da8848] rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#da8848]/10 transition">
                      <Briefcase size={18} /> Download Resume
                    </motion.button>
                  )}
                  <motion.button type="submit" disabled={sending} className="flex-1 px-4 py-3 bg-[#da8848] text-black rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                    <Mail size={18} /> {sending ? "Sending..." : "Submit Application"}
                  </motion.button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">Application sent successfully!</p>}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Link */}
      <div className="text-center pb-12 md:pb-20 px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base">
          <ChevronRight className="rotate-180" size={16} /> Back to Home
        </Link>
      </div>

      <FooterSection />
    </div>
  );
};

export default CareerPage;

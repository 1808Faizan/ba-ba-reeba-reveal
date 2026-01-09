import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/Back-ground-video.mp4";
import cdIcon from "@/assets/Mute-Unmute.png";

const HeroSection = () => {
  const brandName = "BABAREEBA";
  const letters = brandName.split("");

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* FULLSCREEN VIDEO */}
      <motion.video
        ref={videoRef}
        src={heroBg}
        autoPlay
        loop
        playsInline
        muted={muted}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale: imageScale }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* TITLE */}
      <h1 className="relative z-20 text-white font-brand-serif leading-none whitespace-nowrap text-[14vw] md:text-[12vw] tracking-[0.15em]">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      {/* TAGLINE */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        className="absolute text-center text-white/90 font-brand-serif
             text-[13px] md:text-[19px]
             bottom-24 md:bottom-12 px-6 tracking-wider"
      >
        THIS IS FOOD THAT MOVES YOU
        <br />
        TO TASTE, TO TAP, TO TUNE IN
      </motion.p>

      {/* CTA LEFT */}
      <div className="absolute bottom-6 left-6 md:left-10 text-white font-brand-serif text-[11px] md:text-[17px] tracking-wider">
        NEED A HAND?
      </div>

      {/* CTA RIGHT */}
      <div className="absolute bottom-6 right-6 md:right-10 text-white font-brand-serif text-[11px] md:text-[17px] tracking-wider">
        COMING RIGHT UP!
      </div>

      {/* 🎧 ROTATING CD MUTE BUTTON */}
      <motion.button
        onClick={toggleMute}
        className="
          absolute
          bottom-14
          -right-1
          z-30
          w-[70px] h-[70px]
          md:w-[100px] md:h-[100px]
          rounded-full overflow-hidden
          flex items-center justify-center
        "
        aria-label={muted ? 'Tap to unmute video' : 'Tap to mute video'}
        title={muted ? 'Tap to unmute' : 'Tap to mute'}
        whileTap={{ scale: 0.92 }}
      >
        <motion.img
          src={cdIcon}
          alt="Sound control CD icon"
          className="w-full h-full object-cover rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        />
      </motion.button>
    </section>
  );
};

export default HeroSection;

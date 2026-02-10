import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/Back-ground-video.mp4";
import cdIcon from "@/assets/Mute-Unmute.png";

const PLAYLIST = [
  { title: "Midnight Groove", artist: "Babareeba Sessions", src: "/music/track-1.mp3" },
  { title: "Velvet Nights", artist: "Lounge Collective", src: "/music/track-2.mp3" },
  { title: "Golden Hour", artist: "Sunset Beats", src: "/music/track-3.mp3" },
  { title: "Deep Ember", artist: "Club Vibes", src: "/music/track-4.mp3" },
  { title: "Silk & Smoke", artist: "After Dark", src: "/music/track-5.mp3" },
];

const TOOLTIP_KEY = "babareeba_cd_tooltip_shown";

const HeroSection = () => {
  const brandName = "BABAREEBA";
  const letters = brandName.split("");
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const nowPlayingTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Show tooltip once
  useEffect(() => {
    const seen = sessionStorage.getItem(TOOLTIP_KEY);
    if (!seen) {
      const timer = setTimeout(() => setShowTooltip(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showTooltip) {
      sessionStorage.setItem(TOOLTIP_KEY, "true");
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Autoplay music on first user interaction
  useEffect(() => {
    const tryAutoplay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          flashNowPlaying();
        }).catch(() => {
          // Autoplay blocked — wait for interaction
        });
      }
    };

    tryAutoplay();

    const handleInteraction = () => {
      tryAutoplay();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const flashNowPlaying = useCallback(() => {
    setShowNowPlaying(true);
    if (nowPlayingTimeout.current) clearTimeout(nowPlayingTimeout.current);
    nowPlayingTimeout.current = setTimeout(() => setShowNowPlaying(false), 3000);
  }, []);

  const nextTrack = useCallback(() => {
    const next = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(next);

    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[next].src;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        flashNowPlaying();
      }).catch(() => {});
    }
  }, [currentTrack, flashNowPlaying]);

  // When track ends, auto-advance
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => nextTrack();
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [nextTrack]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* FULLSCREEN VIDEO — always muted, no controls */}
      <motion.video
        ref={videoRef}
        src={heroBg}
        autoPlay
        loop
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale: imageScale }}
      />

      {/* HIDDEN AUDIO PLAYER */}
      <audio
        ref={audioRef}
        src={PLAYLIST[0].src}
        preload="auto"
        loop={false}
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
        className="absolute text-center text-white/90 font-brand-serif text-[13px] md:text-[19px] bottom-24 md:bottom-12 px-6 tracking-wider"
      >
        THIS IS FOOD THAT MOVES YOU <br /> TO TASTE, TO TAP, TO TUNE IN
      </motion.p>

      {/* CTA LEFT */}
      <div className="absolute bottom-6 left-6 md:left-10 text-white font-brand-serif text-[11px] md:text-[17px] tracking-wider">
        NEED A HAND?
      </div>

      {/* CTA RIGHT */}
      <div className="absolute bottom-6 right-6 md:right-10 text-white font-brand-serif text-[11px] md:text-[17px] tracking-wider">
        COMING RIGHT UP!
      </div>

      {/* NOW PLAYING INDICATOR */}
      <AnimatePresence>
        {showNowPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-28 md:bottom-20 right-6 md:right-10 z-40 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
          >
            {/* Equalizer bars */}
            <div className="flex items-end gap-[2px] h-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-primary rounded-full"
                  animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </div>
            <div className="text-white/90 text-[10px] md:text-xs font-medium tracking-wide">
              <span className="text-primary">{PLAYLIST[currentTrack].title}</span>
              <span className="text-white/50 ml-1">— {PLAYLIST[currentTrack].artist}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOOLTIP */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-[120px] md:bottom-[130px] right-2 md:right-4 z-50 bg-white text-black text-[11px] md:text-xs font-medium px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
          >
            Want to change the music? Click on the CD 🎵
            <div className="absolute -bottom-1 right-8 w-2 h-2 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎧 ROTATING CD — NEXT TRACK CONTROLLER */}
      <motion.button
        onClick={nextTrack}
        className="absolute bottom-14 -right-1 z-30 w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex items-center justify-center"
        aria-label="Next track"
        title={`Now: ${PLAYLIST[currentTrack].title} — Click for next`}
        whileTap={{ scale: 0.92 }}
      >
        <motion.img
          src={cdIcon}
          alt="CD music controller"
          className="w-full h-full object-cover rounded-full"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={isPlaying ? { repeat: Infinity, duration: 6, ease: "linear" } : { duration: 0 }}
        />
      </motion.button>
    </section>
  );
};

export default HeroSection;

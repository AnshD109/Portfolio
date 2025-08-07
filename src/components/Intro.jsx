import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(5);
  useEffect(() => {

setSecondsLeft(5); // Always reset on mount
  const timer = setTimeout(onClose, 5000);
  const interval = setInterval(() => {
    setSecondsLeft(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 1;
      }
      return prev - 1;
    });
  }, 1000);

    const onKey = (e) => (e.key === "Enter" || e.key === " ") && onClose();
    const onScroll = () => onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
  

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 z-[999] min-h-screen flex flex-col items-center justify-center bg-[#181c22] overflow-hidden px-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* SVG grid: 5x5, large cells, blue/teal lines, very low opacity */}
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          width="100%" height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* 5 columns */}
          {[...Array(22)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 4.545}
              x2={(i + 1) * 4.545}
              y1="0"
              y2="100"
              stroke="#67e8f9"
              strokeWidth="0.15"
              opacity="0.07"
            />
          ))}
          {/* 5 rows */}
          {[...Array(0)].map((_, i) => (
            <line
              key={`h-${i}`}
              y1={(i + 1) * 9.09}
              y2={(i + 1) * 9.09}
              x1="0"
              x2="100"
              stroke="#67e8f9"
              strokeWidth="0.15"
              opacity="0.07"
            />
          ))}
        </svg>

        {/* Animated text content */}
        <div className="z-20 flex flex-col items-center">
          <motion.h1
            className="mb-1 font-bold text-white tracking-wide text-base md:text-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, type: "spring" }}
          >
            Ansh Dankhara
          </motion.h1>
          <motion.span
            className="mb-1 font-bold text-[#67e8f9] tracking-wide text-base md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, type: "spring" }}
          >
            Data Analyst | MSc Data Science Candidate
          </motion.span>
          <motion.p
            className="text-lg md:text-xl text-[#b8eafe] font-medium text-center max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55, type: "tween" }}
          >
            
          </motion.p>
        </div>
        {/* Dismiss cue + timer */}
        <div className="flex flex-col items-center mt-8">
  <motion.p
    className="text-[#a6e3f8] text-sm mb-2 font-medium text-slate-400"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.95, duration: 0.5 }}
  >
    Scroll, press <span className="font-bold">Enter</span>, or click below to continue...
  </motion.p>
  <button
    onClick={onClose}
    className="focus:outline-none"
    aria-label="Continue to main site"
    tabIndex={0}
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.1 }}
    >
      <svg width="34" height="34" fill="none" stroke="#72eaf6" strokeWidth="3">
        <path d="M10 16l7 7 7-7" />
      </svg>
    </motion.div>
  </button>
  {/* Progress bar */}
  <motion.div
    className="mt-4 h-1 w-32 bg-[#e3f6fa30] rounded-full overflow-hidden"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 5, ease: "linear" }}
    style={{ transformOrigin: "left" }}
  >
    <div className="h-1 w-full bg-[#67e8f9]" />
  </motion.div>
  <span className="text-xs text-slate-400 mt-1">
    Auto-advancing in <span className="font-bold">{secondsLeft}</span> second{secondsLeft > 1 ? "s" : ""}
  </span>
</div>
      </motion.section>
    </AnimatePresence>
  );
}
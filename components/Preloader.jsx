'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration of the preloader before it exits
    const timer = setTimeout(() => setIsVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const text = "ShubhValueCart";
  const letters = text.split("");

  // Container for the staggered text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.4 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // 3D Flip animation for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          // Completely different exit: A sleek "curtain pull" using clip-path
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }} 
          transition={{ duration: 0.9, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="
            fixed inset-0 z-[100]
            bg-white
            flex flex-col items-center justify-center
            px-6
            overflow-hidden
            font-inter
          "
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            .font-inter { font-family: 'Inter', sans-serif; }
          `}} />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
            style={{ perspective: "1000px" }} // Enables the 3D flip effect
          >
            {/* New Premium Loader: Dual Spinning Rings */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.1 }}
              className="relative w-14 h-14 mb-10"
            >
              {/* Outer Ring */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute inset-0 border-[3px] border-gray-100 border-t-[#1D1D1F] border-r-[#1D1D1F] rounded-full"
              />
              {/* Inner Ring */}
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="absolute inset-2 border-[3px] border-gray-100 border-b-gray-400 rounded-full"
              />
            </motion.div>

            {/* Staggered 3D Text Reveal */}
            <div className="flex overflow-hidden pb-2">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="text-[#1D1D1F] font-extrabold tracking-tighter text-4xl sm:text-5xl md:text-6xl inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle Blur Reveal */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              className="mt-6 text-gray-400 text-xs sm:text-sm tracking-[0.4em] uppercase font-bold"
            >
              Premium Experience
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

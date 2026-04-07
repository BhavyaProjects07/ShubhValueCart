import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    badge: 'Mega Sale',
    title: 'Shubh Value Cart',
    subtitle: 'Up to 10% OFF on Groceries and SkinCare',
    color: 'from-blue-900/95 via-blue-900/80 to-transparent',
    accent: 'bg-blue-500'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    badge: 'Trending Now',
    title: 'Fashion Carnival',
    subtitle: 'Min 50% OFF on Premium Brands',
    color: 'from-orange-900/95 via-orange-900/80 to-transparent',
    accent: 'bg-orange-500'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    badge: 'New Arrivals',
    title: 'Home Essentials',
    subtitle: 'Upgrade Your Living Space Today',
    color: 'from-purple-900/95 via-purple-900/80 to-transparent',
    accent: 'bg-purple-500'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBanners.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-[350px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // 🔥 reduced from 0.8
          className="absolute inset-0"
        >
          {/* Image */}
          <motion.img 
            initial={{ scale: 1.05 }}   // 🔥 reduced from 1.1
            animate={{ scale: 1 }}
            transition={{ duration: 4, ease: "easeOut" }} // 🔥 reduced duration
            src={heroBanners[current].image} 
            alt="Banner" 
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover will-change-transform"
          />

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${heroBanners[current].color} flex items-center`}>
            <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12 relative z-10">
              
              {/* Content */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }} // 🔥 reduced movement
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl text-white"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block ${heroBanners[current].accent} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider`}
                >
                  {heroBanners[current].badge}
                </motion.span>

                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
                  {heroBanners[current].title}
                </h2>

                <p className="text-lg sm:text-2xl font-medium mb-8 drop-shadow-lg text-white/90">
                  {heroBanners[current].subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button 
                    className="bg-[#ff9900] hover:bg-[#e68a00] text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 will-change-transform"
                  >
                    Shop Now <ChevronRight className="w-5 h-5" />
                  </button>

                  <button 
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-200 hover:scale-105 will-change-transform"
                  >
                    View Offers
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {heroBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-200 ${
              current === idx ? 'w-10 bg-[#ff9900]' : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % heroBanners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroSlider;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

const categories = [
  {
    id: 'fashion',
    title: 'Haute Couture',
    subtitle: 'The Heritage Collection',
    description: 'Exquisite craftsmanship meets contemporary luxury. Discover our curated selection of premium apparel.',
    imageMain: 'https://picsum.photos/seed/couture/1200/1600',
    imageSub: 'https://picsum.photos/seed/fabric/800/800',
    label: 'Fashion',
    tags: ['Handcrafted', 'Sustainable', 'Bespoke Fit']
  },
  {
    id: 'groceries',
    title: 'Epicurean',
    subtitle: 'The Spice Reserve',
    description: 'Sourced from the finest estates. Elevate your culinary journey with our premium groceries and rare spices.',
    imageMain: 'https://picsum.photos/seed/spices/1200/1600',
    imageSub: 'https://picsum.photos/seed/ingredients/800/800',
    label: 'Groceries',
    tags: ['Organic', 'Farm Fresh', 'Export Quality']
  },
  {
    id: 'cosmetics',
    title: 'Ayurvedic Luxe',
    subtitle: 'Radiance Redefined',
    description: 'Indulge in world-class skincare rooted in ancient wisdom. Formulated with precious botanicals.',
    imageMain: 'https://picsum.photos/seed/skincare/1200/1600',
    imageSub: 'https://picsum.photos/seed/serum/800/800',
    label: 'Cosmetics',
    tags: ['Cruelty Free', '100% Natural', 'Dermatologist Tested']
  },
  {
    id: 'toys',
    title: 'Curated Play',
    subtitle: 'Heirloom Quality',
    description: 'Inspire imagination with our collection of premium, sustainably crafted wooden toys and educational masterpieces.',
    imageMain: 'https://picsum.photos/seed/woodentoys/1200/1600',
    imageSub: 'https://picsum.photos/seed/play/800/800',
    label: 'Toys',
    tags: ['Non-toxic', 'Educational', 'Eco-friendly']
  },
  {
    id: 'fmcg',
    title: 'Sanctuary',
    subtitle: 'Elevated Essentials',
    description: 'Transform your daily rituals. Premium home essentials, brassware, and fragrances designed for the sophisticated household.',
    imageMain: 'https://picsum.photos/seed/homeinterior/1200/1600',
    imageSub: 'https://picsum.photos/seed/candles/800/800',
    label: 'FMCG',
    tags: ['Premium Quality', 'Long Lasting', 'Authentic']
  },
  {
    id: 'entertainment',
    title: 'Festive Joy',
    subtitle: 'The Celebration',
    description: 'Experience unparalleled vibrancy. The ultimate in premium festive decor, entertainment, and cultural celebrations.',
    imageMain: 'https://picsum.photos/seed/festival/1200/1600',
    imageSub: 'https://picsum.photos/seed/decor/800/800',
    label: 'Entertainment',
    tags: ['Vibrant', 'Hand-painted', 'Artisanal']
  }
];

export const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Preload images to ensure smooth transitions
    categories.forEach((category) => {
      const imgMain = new Image();
      imgMain.src = category.imageMain;
      const imgSub = new Image();
      imgSub.src = category.imageSub;
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualChange = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full min-h-[100dvh] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-[#F5F5F7] to-[#E8E8ED] text-[#1D1D1F] overflow-hidden flex flex-col justify-center pt-24 pb-32 lg:py-0">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Vertical Side Indicator (Desktop Only) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <span className="font-inter text-[10px] font-bold tracking-[0.3em] text-gray-400 [writing-mode:vertical-lr] rotate-180">
          EXPLORE COLLECTION
        </span>
        <div className="w-[1px] h-24 bg-gray-300"></div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start w-full"
            >
              <span className="font-inter text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                {categories[activeIndex].subtitle}
              </span>
              
              <h1 className="font-inter text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-tighter text-[#1D1D1F] leading-[1.05] mb-6">
                {categories[activeIndex].title}
              </h1>

              {/* Dynamic Feature Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6">
                {categories[activeIndex].tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D1D1F]" /> {tag}
                  </span>
                ))}
              </div>
              
              <p className="font-inter text-base sm:text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
                {categories[activeIndex].description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#1D1D1F] text-white rounded-full font-inter font-medium flex items-center justify-center gap-3 hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10">
                  Shop Now <ShoppingBag className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#1D1D1F] rounded-full font-inter font-medium flex items-center justify-center gap-3 hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-sm border border-gray-200">
                  Explore <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust / Social Proof Section */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-8 border-t border-gray-200/80 w-full max-w-md">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i} 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      className="w-10 h-10 rounded-full border-2 border-[#F5F5F7] shadow-sm object-cover" 
                      alt="Customer" 
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-inter text-xs font-medium text-gray-600">
                    Trusted by <strong className="text-[#1D1D1F]">10,000+</strong> customers
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image Composition Area */}
        <div className="w-full lg:w-1/2 relative h-[40vh] sm:h-[50vh] lg:h-[70vh] max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 bg-gray-200"
            >
              <img 
                src={categories[activeIndex].imageMain} 
                alt={categories[activeIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle inner shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] rounded-[2rem] sm:rounded-[3rem] pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Sub Image (Hidden on very small screens) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`sub-${activeIndex}`}
              initial={{ opacity: 0, x: 20, y: 20, rotate: -5 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -20, y: -20, rotate: 5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute -bottom-6 -left-6 lg:-bottom-12 lg:-left-12 w-32 h-40 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-[8px] border-[#F5F5F7] shadow-2xl z-20 hidden sm:block bg-gray-200"
            >
              <img 
                src={categories[activeIndex].imageSub} 
                alt="Detail view"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Trust Badge */}
          <div className="absolute top-6 -right-6 lg:top-12 lg:-right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 z-30 hidden md:flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-xs font-bold text-gray-900">Secure Checkout</span>
              <span className="font-inter text-[10px] text-gray-500">100% Protected</span>
            </div>
          </div>
          
          <div className="absolute bottom-12 -right-6 lg:bottom-24 lg:-right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 z-30 hidden md:flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-xs font-bold text-gray-900">Free Shipping</span>
              <span className="font-inter text-[10px] text-gray-500">On orders over $50</span>
            </div>
          </div>

        </div>

      </div>

      {/* Sleek Bottom Navigation Pill */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full flex justify-center z-30 px-4">
        <div className="bg-white/70 backdrop-blur-xl p-1.5 sm:p-2 rounded-full shadow-lg shadow-black/5 border border-white/40 flex gap-1 sm:gap-2 overflow-x-auto max-w-full hide-scrollbar">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleManualChange(index)}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-inter text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeIndex === index ? 'text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {activeIndex === index && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-[#1D1D1F] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

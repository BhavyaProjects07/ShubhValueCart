import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: "Heritage Textiles",
    subtitle: "Authentic Indian Wear",
    image: "https://picsum.photos/seed/indianclothes/800/1000",
    link: "/shop/fashion"
  },
  {
    title: "The Spice Reserve",
    subtitle: "Premium Groceries",
    image: "https://picsum.photos/seed/indianspices/800/1000",
    link: "/shop/groceries"
  },
  {
    title: "Artisanal Play",
    subtitle: "Handcrafted Toys",
    image: "https://picsum.photos/seed/woodentoys/800/1000",
    link: "/shop/toys"
  },
  {
    title: "Ayurvedic Wellness",
    subtitle: "Natural Cosmetics",
    image: "https://picsum.photos/seed/ayurveda/800/1000",
    link: "/shop/cosmetics"
  },
  {
    title: "Festive Living",
    subtitle: "Home & Decor",
    image: "https://picsum.photos/seed/festivedecor/800/1000",
    link: "/shop/entertainment"
  }
];

const ExtraUI = () => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#1D1D1F] overflow-hidden font-inter">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-2xl">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Discover Excellence
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1]">
            Curated for the <br className="hidden md:block" /> modern lifestyle.
          </h2>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-semibold hover:text-gray-600 transition-colors group">
          View All Collections 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Carousel */}
      <div className="flex gap-6 px-6 md:px-12 xl:px-24 pb-12 overflow-x-auto hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
        {COLLECTIONS.map((collection, i) => (
          <motion.div 
            
            className="flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] aspect-[4/5] relative rounded-[2rem] overflow-hidden snap-center group"
          >
            <img 
              src={collection.image} 
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {collection.subtitle}
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {collection.title}
              </h3>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:bg-white hover:text-black">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Mobile View All Button */}
      <div className="px-6 md:hidden mt-4">
         <button className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gray-100 text-sm font-semibold hover:bg-gray-200 transition-colors">
          View All Collections <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ExtraUI;

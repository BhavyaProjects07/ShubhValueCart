import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, ShoppingCart, User, ChevronLeft, ChevronRight, 
  Star, Heart, Menu, MapPin, ChevronDown, Zap, Clock, Tag,
  Gift, Percent, Truck
} from 'lucide-react';
import axios from 'axios';

import { useRouter } from "next/navigation";

const GridBanners = () => {

    const router = useRouter();
    const gridBanners = [
  { id: 1, title: 'Under ₹499', subtitle: 'Daily Essentials', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', color: 'bg-pink-50',  cat:"food-grocery"},
  { id: 2, title: 'Up to 10% off', subtitle: 'HouseHold Essentials', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', color: 'bg-blue-50' , cat:"household" },
  { id: 3, title: 'New Toys', subtitle: 'Toys for kids', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', color: 'bg-purple-50' , cat:"toys-kids"},
  { id: 4, title: 'Clearance', subtitle: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400', color: 'bg-orange-50' , cat:"home-cleaning" }
];
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        

                {gridBanners.map((banner, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                    if (banner.cat) {
                        router.push(`/shop?page=1&category=${banner.cat}`)
                    }
                    }}
                    className={`relative h-[160px] sm:h-[200px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all ${banner.color}`}
                >
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center z-10 w-2/3">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 leading-tight">{banner.title}</h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-3">{banner.subtitle}</p>
              <div className="mt-auto">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-[#2874f0] group-hover:bg-[#2874f0] group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <img 
              src={banner.image} 
              alt={banner.title} 
              loading="lazy"
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GridBanners

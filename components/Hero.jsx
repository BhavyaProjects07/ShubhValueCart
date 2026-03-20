import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Banner from './Banner';

const carouselItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2000&auto=format&fit=crop' }
];

const bottomCardsRow1 = [
  {
    type: 'grid',
    title: 'Up to 60% off | Styles for men',
    items: [
      { img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400', name: 'Clothing' },
      { img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', name: 'Footwear' },
      { img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSOZvqa92xnbdchbWqvS0tjiXxLi0N5PYycJQdWIJIIYgVEICfoMRV2cwL8msDLw3usXdolXui0bdHFTRxjRocDU4ChcuS-xg4ggcMxnmqVIIQ3Bb2hvD93', name: 'Watches' },
      { img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', name: 'Bags & wallets' }
    ],
    linkText: 'End of season sale'
  },
  {
    type: 'grid',
    title: 'Revamp your home in style',
    items: [
      { img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400', name: 'Bedsheets & curtains' },
      { img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400', name: 'Home decoration' },
      { img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', name: 'Home storage' },
      { img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400', name: 'Lighting solutions' }
    ],
    linkText: 'Explore all'
  },
  {
    type: 'grid',
    title: 'Starting ₹99 | Toys & Games',
    items: [
      { img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400', name: 'Soft Toys' },
      { img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTM-FyoGKQCTbE675XvoS4Q87FmU_tIVZ64KWnf5gvKVEWNCT1G_6um4b2tcQp1meA4fGCRhoFQuaLvHntYKfMYjErMsWeG_CFPdOlboJTHvdWsejHANKYdHFg', name: 'Action Figures' },
      { img: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400', name: 'Board Games' },
      { img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', name: 'Educational' }
    ],
    linkText: 'Shop now'
  },
  {
    type: 'grid',
    title: 'Fresh Groceries & Essentials',
    items: [
      { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', name: 'Fresh Produce' },
      { img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=400', name: 'Dairy & Bakery' },
      { img: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400', name: 'Snacks & Beverages' },
      { img: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=400', name: 'Household Care' }
    ],
    linkText: 'See all offers'
  }
];

const bottomCardsRow2 = [
  {
    type: 'single',
    title: 'Up to 70% off | Clearance store',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800',
    linkText: 'Shop now'
  },
  {
    type: 'grid',
    title: 'Starting ₹149 | Headphones',
    items: [
      { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', name: 'Boat' },
      { img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', name: 'Boult' },
      { img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400', name: 'Noise' },
      { img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400', name: 'Zebronics' }
    ],
    linkText: 'See all offers'
  },
  {
    type: 'single',
    title: 'Upgrade your tech | Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    linkText: 'Shop now'
  },
  {
    type: 'grid',
    title: 'Beauty & Personal Care',
    items: [
      { img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTHXuHmJvfNmEo4oHvVkO_-qx1tCqkMsHZzAdJhFi2mtiCTwFk_9jMP4wdTc8x0o17odJa9j8fY7s0h07outCxA35pk0iGfWnWjQG9IF8EQ1XUoZEdx7StK', name: 'Makeup' },
      { img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', name: 'Skincare' },
      { img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', name: 'Haircare' },
      { img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRnaiVc_pK_0oboYBJ7S30w2rs30YIEtWsl6mwR5Ae945K5DZRutwixFk7YY_EeNfCRujwmjRpsc5Wd_3okH2yQeCCz6txVRU2Roe0as2i5jTJ_RWGnsBVj', name: 'Bath & Body' }
    ],
    linkText: 'Explore all'
  }
];

const deals = [
  { id: 1, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', discount: 'Up to 30% off', name: 'Smartphones & Accessories' },
  { id: 2, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', discount: 'Up to 50% off', name: 'Laptops & Tablets' },
  { id: 3, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', discount: 'Up to 40% off', name: 'Smartwatches' },
  { id: 4, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', discount: 'Up to 60% off', name: 'Running Shoes' },
  { id: 5, img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', discount: 'Up to 75% off', name: 'Wireless Earbuds' },
  { id: 6, img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400', discount: 'Up to 20% off', name: 'Home Appliances' },
  { id: 7, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', discount: 'Up to 40% off', name: 'Camera & Photography' },
  { id: 8, img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', discount: 'Up to 15% off', name: 'Smart Watches' },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div className="bg-[#E3E6E6] min-h-screen pt-[72px] sm:pt-[80px]">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 25s linear infinite;
}
      `}} />

      {/* Banner Container - Placed at the top */}
     

      <div className="relative w-full max-w-[1500px] mx-auto">
        
        {/* Full-width Carousel Background */}
        <div className="absolute top-0 left-0 w-full h-[300px] sm:h-[400px] lg:h-[600px] z-0 overflow-hidden">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={item.image} alt="Carousel Banner" className="w-full h-full object-cover object-top" />
            </div>
          ))}
          
          {/* Gradient overlay to blend into the #E3E6E6 background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E3E6E6] z-10 pointer-events-none" />

          {/* Carousel Controls - Amazon Style (Tall rectangles) */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-10 h-[200px] sm:h-[250px] px-2 sm:px-4 focus:outline-none z-20 group"
          >
            <div className="bg-transparent group-hover:bg-white/50 border-2 border-transparent group-hover:border-white rounded-sm p-2 transition-all">
              <ChevronLeft className="w-8 h-8 text-gray-800" />
            </div>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-10 h-[200px] sm:h-[250px] px-2 sm:px-4 focus:outline-none z-20 group"
          >
            <div className="bg-transparent group-hover:bg-white/50 border-2 border-transparent group-hover:border-white rounded-sm p-2 transition-all">
              <ChevronRight className="w-8 h-8 text-gray-800" />
            </div>
          </button>
        </div>

        {/* Overlapping Content (Cards) */}
        <div className="relative z-10 px-4 pt-[120px] sm:pt-[200px] lg:pt-[280px] pb-8">
          
          {/* Grid Cards Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
  {bottomCardsRow1.map((card, idx) => (
    <div
      key={idx}
      className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 leading-snug tracking-tight">
        {card.title}
      </h3>

      {card.type === "grid" ? (
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {card.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <span className="text-xs font-medium text-gray-600 leading-tight line-clamp-2">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow cursor-pointer mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover max-h-[300px] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* CTA */}
      <a
        href="#"
        className="mt-6 text-sm font-semibold text-gray-900 hover:text-black flex items-center gap-1 transition-all duration-200"
      >
        {card.linkText}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  ))}
          </div>

          {/* Grid Cards Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {bottomCardsRow2.map((card, idx) => (
    <div
      key={idx}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-5 flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-2xl pointer-events-none" />

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 leading-snug tracking-tight">
        {card.title}
      </h3>

      {card.type === "grid" ? (
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {card.items.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 cursor-pointer">
              
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* Soft overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
              </div>

              {/* Text */}
              <span className="text-xs font-medium text-gray-600 leading-tight line-clamp-2 group-hover:text-gray-900 transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow cursor-pointer mb-4 overflow-hidden rounded-xl bg-gray-100 relative">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover max-h-[300px] transition-all duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
        </div>
      )}

      {/* CTA */}
      <a
        href="#"
        className="mt-6 text-sm font-semibold text-gray-900 flex items-center justify-between group-hover:text-black transition-all duration-300"
      >
        {card.linkText}
        <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
          →
        </span>
      </a>
    </div>
  ))}
          </div>

          {/* Horizontal Scroll Section (Today's Deals) */}
          <div className="mt-8 relative overflow-hidden">
  
  {/* Container */}
  <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">

    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
        Today’s Deals
      </h3>

      <a
        href="#"
        className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1"
      >
        See all
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>

    {/* 🔥 Moving Loop */}
    <div className="overflow-hidden">
      <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
        
        {[...deals, ...deals].map((deal, idx) => (
          <div
            key={idx}
            className="min-w-[180px] sm:min-w-[220px] group flex flex-col gap-3 cursor-pointer"
          >
            
            {/* Image Card */}
            <div className="relative h-[180px] sm:h-[220px] bg-gray-100 rounded-xl flex items-center justify-center p-4 overflow-hidden">
              
              <img
                src={deal.img}
                alt={deal.name}
                className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
            </div>

            {/* Discount Badge */}
            <div className="flex items-center gap-2">
              <span className="bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                {deal.discount}
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline">
                Limited Deal
              </span>
            </div>

            {/* Product Name */}
            <span className="text-sm font-medium text-gray-700 leading-tight line-clamp-2 group-hover:text-gray-900 transition-colors">
              {deal.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

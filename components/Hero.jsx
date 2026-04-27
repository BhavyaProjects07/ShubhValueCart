import React, { useState, useEffect, useRef } from 'react';

import { 
  Search, ShoppingCart, User, ChevronLeft, ChevronRight, 
  Star, Heart, Menu, MapPin, ChevronDown, Zap, Clock, Tag,
  Gift, Percent, Truck
} from 'lucide-react';
import axios from 'axios';
import Deals from "@/components/Deals"
import Recommended from "@/components/Recommended"
import Dealstrip from "@/components/home/Dealstrip"
import { useRouter } from "next/navigation";
import GridBanners from './GridBanners';
import HeroSlider from './heroBanner';
import Advertisement from './Advertisement';
import Image from "next/image";
import ProductCard from './ProductCard';
import FashionProducts from './Fashion';
// --- DATA ---





export const cats = [
  {
    name: "Food & Grocery",
    slug: "food-grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
  },
  {
    name: "Staples & Cooking",
    slug: "staples-cooking",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571"
  },
  {
    name: "Home & Cleaning",
    slug: "home-cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
  },
  {
    name: "Baby Care",
    slug: "baby-care",
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396"
  },
  {
    name: "Toys & Kids",
    slug: "toys-kids",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b"
  },
  {
    name: "Household Essentials",
    slug: "household",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
  },
  {
    name: "Stationery",
    slug: "stationery",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
  },
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
  }
];


const deals = [
  { id: 1, name: 'Apple iPhone 15 (128GB)', price: '₹65,999', original: '₹79,900', discount: '17% OFF', rating: 4.8, reviews: '12k', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400' },
  { id: 2, name: 'Sony WH-1000XM5', price: '₹24,990', original: '₹34,990', discount: '28% OFF', rating: 4.7, reviews: '8k', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400' },
  { id: 3, name: 'Samsung 4K Smart TV', price: '₹42,990', original: '₹64,900', discount: '33% OFF', rating: 4.6, reviews: '5k', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { id: 4, name: 'Nike Air Max 270', price: '₹8,495', original: '₹12,995', discount: '34% OFF', rating: 4.5, reviews: '3k', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: 5, name: 'Dyson V12 Detect Slim', price: '₹44,900', original: '₹55,900', discount: '19% OFF', rating: 4.9, reviews: '2k', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
  { id: 6, name: 'Bose QuietComfort Earbuds', price: '₹18,990', original: '₹26,900', discount: '29% OFF', rating: 4.6, reviews: '4k', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' },
];

const bestSellers = [
  { id: 7, name: 'Organic Almonds (1kg)', price: '₹899', original: '₹1,200', discount: '25% OFF', rating: 4.8, reviews: '1.2k', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400' },
  { id: 8, name: 'Ariel Matic Liquid (2L)', price: '₹450', original: '₹500', discount: '10% OFF', rating: 4.5, reviews: '5k', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400' },
  { id: 9, name: 'Pampers Diapers (L)', price: '₹1,199', original: '₹1,499', discount: '20% OFF', rating: 4.7, reviews: '8k', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400' },
  { id: 10, name: 'Dove Body Wash', price: '₹299', original: '₹399', discount: '25% OFF', rating: 4.6, reviews: '3k', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400' },
  { id: 11, name: 'Tata Tea Gold (500g)', price: '₹245', original: '₹300', discount: '18% OFF', rating: 4.8, reviews: '10k', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c0a1?w=400' },
];

const midBanners = [
  { id: 1, title: 'Grocery Sale', subtitle: 'Stock up and save big on daily essentials', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200', color: 'from-green-900/90' , cat:"food-grocery" },
  { id: 2, title: 'Enhance your skin', subtitle: 'Latest skin care products at unbeatable prices', image: 'https://thephrase.in/cdn/shop/articles/Skin_Care_Banner_1.jpg?v=1697455809&width=1100?w=1200', color: 'from-pink-900/90' , cat:"personal-care"}
];

const splitBanners = [
  { id: 1, title: 'Staples & Cooking', subtitle: 'Starting at ₹1,999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4CAlq-V7qlxvzyWFr3D6SIRkT9lwJiS5-Q&s', color: 'from-purple-900/90' ,cat : "staples-cooking"},
  { id: 2, title: 'Your Stationary Collection', subtitle: 'Up to 60% OFF', image: 'https://static.vecteezy.com/system/resources/thumbnails/071/157/463/small/back-to-school-supplies-background-colorful-stationery-calculator-and-blank-workspace-for-educational-and-creative-projects-photo.jpg?w=800', color: 'from-red-900/90' , cat : "stationery"}
];

const gridBanners = [
  { id: 1, title: 'Under ₹499', subtitle: 'Daily Essentials', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', color: 'bg-pink-50' },
  { id: 2, title: 'Up to 10% off', subtitle: 'HouseHold Essentials', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', color: 'bg-blue-50' },
  { id: 3, title: 'New Toys', subtitle: 'Toys for kids', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', color: 'bg-purple-50' },
  { id: 4, title: 'Clearance', subtitle: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400', color: 'bg-orange-50' }
];

// --- COMPONENTS ---

const CustomNavbar = ({ categories }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [coupon, setCoupon] = useState(null)
  const router = useRouter();
  const [showOffer, setShowOffer] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get('/api/public/coupons')
      .then(res => {
        if (res.data?.length) {
          setCoupon(res.data[0])
        }
      })
      .catch(err => {
        console.error('COUPON FETCH ERROR:', err)
      })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}
    >
      {/* Top bar */}
      <div className="bg-[#2874f0] text-white text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium"><MapPin className="w-3 h-3" /> Deliver to Mumbai 400001</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <a href="/create-store" className="hover:underline">Sell on Shubh Value Cart</a>
          <a href="/orders" className="hover:underline">Track Order</a>
          <a href="/about" className="hover:underline">24/7 Customer Care</a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-[#2874f0] text-white px-2 py-1 rounded-md font-black text-lg">
            SV
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-black text-[#2874f0]">Shubh Value</span>
            <span className="text-[10px] font-bold text-[#ff9900] tracking-widest">CART</span>
          </div>
        </div>

        {/* 🔥 SEARCH BAR (NEW - VERY IMPORTANT) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <input
            type="text"
            placeholder="Search for products, brands..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2874f0] text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/shop?search=${e.target.value}`)
              }
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Login */}
          <button
      
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-semibold text-gray-700"
          >
            <User className="w-5 h-5" />
            Login
          </button>

          {/* Cart */}
          <button
     
            onClick={() => router.push("/cart")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-semibold text-gray-700 relative"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#ff9900] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                3
              </span>
            </div>
            <span className="hidden md:block">Cart</span>
          </button>

        </div>
      </div>

      {/* Mini Category Bar (Desktop) */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto hide-scrollbar">

          {/* All Categories */}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-semibold shrink-0">
            <Menu className="w-4 h-4" /> All
          </button>

          {/* Categories */}
          {categories.slice(0, 10).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/shop?category=${cat.slug}`)}
              className="px-3 py-1.5 rounded-full text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-[#2874f0] hover:text-white transition-all shrink-0"
            >
              {cat.name}
            </button>
          ))}

        </div>
      </div>

      {/* Bank Offer Strip */}
      {showOffer && (
        <div className="bg-gradient-to-r from-[#2874f0] via-[#3b82f6] to-[#60a5fa] text-white border-b border-blue-300 shadow-sm">
    
          <div className="px-4 py-2 flex items-center justify-between gap-3">

            {/* LEFT CONTENT */}
            <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar">

              {/* ICON */}
              <div className="animate-pulse text-lg">💳</div>

              {coupon ? (
                <div className="flex items-center gap-2">

                  {/* DESCRIPTION */}
                  <span className="text-[11px] sm:text-xs font-medium opacity-90">
                    {coupon.description}
                  </span>

                  {/* COUPON BADGE */}
                  <span className="bg-white text-[#2874f0] font-bold px-2.5 py-1 rounded-md text-[11px] sm:text-xs shadow-sm tracking-wide">
                    {coupon.code}
                  </span>

                  {/* COPY BUTTON */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coupon.code);
                    }}
                    className="text-[10px] sm:text-xs font-semibold bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-all"
                  >
                    Copy
                  </button>

                </div>
              ) : (
                <span className="text-white/70 text-xs">Loading offers...</span>
              )}

            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">

              {/* CTA */}
              {coupon && (
                <button
                  onClick={() => navigator.clipboard.writeText(coupon.code)}
                  className="hidden sm:block bg-white text-[#2874f0] text-xs font-bold px-3 py-1.5 rounded-md hover:scale-105 active:scale-95 transition-all shadow"
                >
                  Apply Now
                </button>
              )}

              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setShowOffer(false);
                  localStorage.setItem("hideOffer", "true");
                }}
                className="text-white/80 hover:text-white text-sm font-bold px-2"
              >
                ✕
              </button>

            </div>

          </div>
        </div>
      )}
      {/* Mobile Search */}
      
    </header>
  );
  
}



const CategoryGrid = React.memo(({ categories = [] }) => {
  const router = useRouter(); // This line was already present in the user's last edit.
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 -mt-8 sm:-mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 backdrop-blur-lg bg-white/90">
        
        {/* Empty State */}
        {categories.length === 0 ? (
          <div className="text-center text-gray-400 py-10 font-medium">
            Loading categories...
          </div>
        ) : (
          <div className="flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 pb-2 sm:pb-0">
            
            {categories.map((cat, idx) => (
              <div
                key={cat._id || idx}
                onClick={() => router.push(`/shop?category=${cat.slug}`)} 
                className="flex flex-col items-center gap-3 min-w-[100px] sm:min-w-[120px] cursor-pointer group shrink-0 will-change-transform transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
              >
                {/* Image Box */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${
                    cat.color || "bg-gray-100"
                  } overflow-hidden relative shadow-sm border border-gray-100 `}
                >
                  <Image
  src={
    cat.image
      ? `${cat.image}?w=200&q=60`
      : "https://via.placeholder.com/150?text=Category"
  }
  alt={cat.name}
  fill
  sizes="100px"
  className="object-cover"
/>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-200" />
                </div>

                {/* Name */}
                <span className="text-xs sm:text-sm font-bold text-gray-800 text-center group-hover:text-[#2874f0] transition-colors leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
});












const MidBanner = ({ banner }) => {

  const router = useRouter();
  
  

  return (
    <div 
      
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12"
    >
      <div className="relative h-[200px] sm:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
        <img 
          
          src={banner.image} 
          alt={banner.title} 
          loading="lazy"
          
          className="absolute inset-0 w-full h-[130%] object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} to-transparent flex items-center`}>
          <div className="px-6 sm:px-12 lg:px-20 text-white max-w-2xl">
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 drop-shadow-lg leading-tight">{banner.title}</h3>
            <p className="text-base sm:text-xl lg:text-2xl font-medium mb-6 sm:mb-8 text-white/90 drop-shadow">{banner.subtitle}</p>
            
            <button 
            onClick={() => {
                    if (banner.cat) {
                        router.push(`/shop?page=1&category=${banner.cat}`)
                    }
                    }} className="bg-white text-gray-900 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold hover:bg-[#ff9900] hover:text-white transition-colors shadow-lg text-sm sm:text-base flex items-center gap-2">
              Explore Now <ChevronRight className="w-4 h-4" />
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

const SplitBanners = () => {

  const router = useRouter();
  
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {splitBanners.map((banner, idx) => (
          <div 
            key={idx}
            
            onClick={() => {
                    if (banner.cat) {
                        router.push(`/shop?page=1&category=${banner.cat}`)
                    }
                    }}
            className="relative h-[200px] sm:h-[250px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
          >
            <img 
              src={banner.image} 
              alt={banner.title} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} to-transparent flex items-center`}>
              <div className="px-6 sm:px-10 text-white max-w-md">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 drop-shadow-md">{banner.title}</h3>
                <p className="text-sm sm:text-base font-medium mb-4 text-white/90 drop-shadow">{banner.subtitle}</p>
                <button className="bg-white/20 hover:bg-white backdrop-blur-sm text-white hover:text-gray-900 border border-white/50 px-5 py-2 rounded-lg font-bold transition-all text-sm">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};







export default function Hero2() {

  

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div 
      
      className="min-h-screen bg-[#f1f3f6] font-sans overflow-x-hidden"
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shimmer {
          background: #f6f7f8;
          background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
          background-repeat: no-repeat;
          background-size: 800px 100%; 
          animation-duration: 1.5s;
          animation-fill-mode: forwards; 
          animation-iteration-count: infinite;
          animation-name: placeholderShimmer;
          animation-timing-function: linear;
        }
        @keyframes placeholderShimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
      `}} />
      <CustomNavbar categories={categories}/>
      <div className="pt-[100px] md:pt-[130px]">
        <HeroSlider />
        <CategoryGrid categories={cats} />
        <Advertisement/>
        <Dealstrip deals={deals} />
        <GridBanners />
        <SplitBanners />
        
        <MidBanner banner={midBanners[0]} />
        
        <FashionProducts/>
        <MidBanner banner={midBanners[1]} />
        
      </div>
    </div>
  );
}
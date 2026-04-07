import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
// --- DATA ---




export const cats = [
  {
    name: "Food & Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
  },
  {
    name: "Staples & Cooking",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
  },
  {
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571"
  },
  {
    name: "Home & Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
  },
  {
    name: "Baby Care",
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396"
  },
  {
    name: "Toys & Kids",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b"
  },
  {
    name: "Household Essentials",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
  },
  {
    name: "Stationery",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Fashion",
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
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
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
        <div className="flex items-center gap-2 md:gap-4">
          <button className="md:hidden p-1"><Menu className="w-6 h-6 text-gray-700" /></button>
          <a href="#" className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-[#2874f0] tracking-tight leading-none">Shubh Value</span>
            <span className="text-[10px] md:text-xs font-bold text-[#ff9900] leading-none tracking-widest mt-1">CART</span>
          </a>
        </div>

        

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <motion.button whileHover={{ scale: 1.05 }} className="hidden md:flex items-center gap-2 hover:text-[#2874f0] transition-colors font-bold text-gray-700">
            <User className="w-5 h-5" />
            <span>Login</span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 hover:text-[#2874f0] transition-colors font-bold text-gray-700 relative">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#ff9900] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>
            <span className="hidden md:block">Cart</span>
          </motion.button>
        </div>
      </div>

      {/* Mini Category Bar (Desktop) */}
     <div className="flex md:flex border-t border-gray-100 bg-white overflow-x-auto hide-scrollbar pt-5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-6 text-sm font-medium text-gray-700">
          
          <button className="flex items-center gap-1 hover:text-[#2874f0] font-bold">
            <Menu className="w-4 h-4" /> All Categories
          </button>

          <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-4 py-2 bg-white hide-scrollbar">
  {categories.slice(0, 10).map((cat, idx) => (
    <span
      key={idx}
      onClick={() => router.push(`/shop?category=${cat.slug}`)}
      className="text-sm font-semibold text-gray-700 shrink-0"
    >
      {cat.name}
    </span>
  ))}
</div>

        </div>
      </div>

      {/* Bank Offer Strip */}
      {showOffer && (
  <div className="bg-[#f0f5ff] border-b border-blue-100">
    <div className="px-4 py-2 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-medium text-[#2874f0]">

      {/* LEFT CONTENT */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <span className="animate-pulse shrink-0">💳</span>

        {coupon ? (
          <>
            <span className="truncate">
              {coupon.description}
            </span>
            <span className="font-bold underline shrink-0">
              {coupon.code}
            </span>
          </>
        ) : (
          <span className="text-gray-400">Loading offers...</span>
        )}
      </div>

      {/* ❌ CLOSE BUTTON */}
      <button
        onClick={() => {
          setShowOffer(false);
          localStorage.setItem("hideOffer", "true");
        }}
        className="text-gray-500 hover:text-black text-sm font-bold px-2"
      >
        ✕
      </button>

    </div>
  </div>
)}

      {/* Mobile Search */}
      
    </motion.header>
  );
  useEffect(() => {
  const hidden = localStorage.getItem("hideOffer");
  if (hidden === "true") {
    setShowOffer(false);
  }
  }, []);
  };


<HeroSlider/>




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
                  } overflow-hidden relative shadow-sm border border-gray-100 transition-shadow duration-200 group-hover:shadow-md`}
                >
                  <img
                    src={
                      cat.image ||
                      "https://via.placeholder.com/150?text=Category"
                    }
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover will-change-transform transition-transform duration-300 group-hover:scale-105"
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



const ProductCard = ({ product, isScrollable = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className={`${isScrollable ? 'min-w-[260px] sm:min-w-[280px]' : 'w-full'} bg-white border border-gray-200 rounded-2xl p-4 relative group hover:shadow-2xl transition-all duration-300 flex flex-col`}
    >
      <div className="absolute top-3 left-3 bg-[#ff9900] text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-md z-10 shadow-sm flex items-center gap-1">
        <Percent className="w-3 h-3" /> {product.discount}
      </div>
      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="h-[200px] sm:h-[240px] w-full mb-4 overflow-hidden rounded-xl bg-gray-50 shimmer flex items-center justify-center relative">
        <motion.img 
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="max-h-full object-contain mix-blend-multiply p-4 relative z-10" 
        />
        {/* Quick Add Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white via-white/90 to-transparent"
            >
              <button className="w-full bg-[#ff9900] hover:bg-[#e68a00] text-white font-bold py-2.5 rounded-lg shadow-md transition-colors text-sm flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-[#2874f0] transition-colors leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-[#ff9900] bg-orange-50 px-1.5 py-0.5 rounded">
            <span className="text-xs font-bold mr-1">{product.rating}</span>
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          </div>
          <span className="text-xs font-medium text-gray-500">({product.reviews} reviews)</span>
        </div>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-gray-900">{product.price}</span>
          <span className="text-xs sm:text-sm font-medium text-gray-400 line-through">{product.original}</span>
        </div>
      </div>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num) => num.toString().padStart(2, '0');

  return (
    <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
      Ends in {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
    </span>
  );
};

<Deals/>

const MidBanner = ({ banner }) => {

  const router = useRouter();
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12"
    >
      <div className="relative h-[200px] sm:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
        <motion.img 
          style={{ y }}
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
    </motion.div>
  );
};

const SplitBanners = () => {

  const router = useRouter();
  
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {splitBanners.map((banner, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

<GridBanners />

const ProductGrid = ({ title, products, icon: Icon }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#2874f0]" />}
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 relative">
              {title}
              <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-[#2874f0] rounded-full" />
            </h2>
          </div>
          <motion.button whileHover={{ x: 5 }} className="text-[#2874f0] font-bold flex items-center gap-1 text-sm sm:text-base hover:underline">
            View All <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MultiCarousel = ({ title, products, icon: Icon }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 relative group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff9900]" />}
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 relative">
              {title}
              <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-[#ff9900] rounded-full" />
            </h2>
          </div>
          <motion.button whileHover={{ x: 5 }} className="text-[#2874f0] font-bold flex items-center gap-1 text-sm sm:text-base hover:underline">
            View All <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        <button 
          onClick={() => scroll('left')}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-xl hidden md:flex hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 pb-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory">
          {products.map((product, idx) => (
            <div key={idx} className="snap-start shrink-0">
              <ProductCard product={product} isScrollable={true} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-xl hidden md:flex hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
      <div className="pt-[110px] md:pt-[170px]">
        <HeroSlider />
        <CategoryGrid categories={cats}  />
        <Dealstrip deals={deals} />
        <GridBanners />
        <SplitBanners />
        
        <MidBanner banner={midBanners[0]} />
        <MultiCarousel title="Upcoming Electronics..Stay Tuned" products={deals} icon={Zap} />
        <MidBanner banner={midBanners[1]} />
        
      </div>
    </motion.div>
  );
}
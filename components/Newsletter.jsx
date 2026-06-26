import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, ChevronLeft, ChevronRight, 
  ArrowRight, Info, Sparkles 
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const CATEGORY_SHOWCASE_DATA = [
  { 
    name: "Food & Grocery", 
    slug: "food-grocery",
    tagline: "Indian namkeen, traditional sweets & kitchen essentials",
    seoTitle: "Buy Groceries Online in Dholpur | Best Indian Snacks & Sweets",
    seoDesc: "Order fresh Indian snacks, delicious traditional sweets, ready-to-eat packets, and beverages online from Shubh Value Cart Dholpur.",
    boxImage: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=200&auto=format&fit=crop",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
        title: "The Indian Snacks Carnival",
        sub: "Craving Namkeens & Sweets? Flat 20% Off on Haldiram's!",
        code: "INDIANSNACKS",
        bgClass: "from-amber-950 via-slate-900/90 to-transparent"
      },
      {
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
        title: "Daily Pantry Stock-up",
        sub: "Fresh flour, pure ghee & spices. Sourced direct, priced honest.",
        code: "DHOLPURPANTRY",
        bgClass: "from-teal-950 via-slate-900/90 to-transparent"
      }
    ]
  },
  { 
    name: "Staples & Cooking", 
    slug: "staples-cooking",
    tagline: "Premium basmati rice, dals & mustard oils",
    seoTitle: "Premium Basmati Rice & Pure Cooking Oils Dholpur | Staples Store",
    seoDesc: "Discover high quality unpolished dals, premium basmati rice, healthy cold-pressed mustard oil, and daily wheat flours at Shubh Value Cart.",
    boxImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=200&auto=format&fit=crop",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
        title: "Royal Basmati Rice Festival",
        sub: "Aromatic grains to perfect your Biryanis. Up to 30% OFF.",
        code: "ROYALRICE",
        bgClass: "from-orange-950 via-slate-900/90 to-transparent"
      }
    ]
  },
  { 
    name: "Personal Care", 
    slug: "personal-care",
    tagline: "Ayurvedic remedies, herbal skincare & grooming",
    seoTitle: "Ayurvedic Skincare & Herbal Personal Care Online Dholpur",
    seoDesc: "Pamper yourself with natural herbal soaps, pure Ayurvedic hair oils, face washes, and top cosmetic brands from Shubh Value Cart's personal care range.",
    boxImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=200&auto=format&fit=crop",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop",
        title: "Authentic Ayurvedic Secrets",
        sub: "Natural skincare products that rejuvenate. No harsh chemicals.",
        code: "AYURGLOW",
        bgClass: "from-emerald-950 via-slate-900/90 to-transparent"
      }
    ]
  },
  { 
    name: "Home & Cleaning", 
    slug: "home-cleaning",
    tagline: "High-grade floor cleaners & aromatic agarbattis",
    seoTitle: "Disinfectant Cleaners & Fragrant Agarbatti Dholpur",
    seoDesc: "Ensure a spotlessly clean home with our range of disinfectant floor cleaners, laundry wash liquids, dish wash gels, and premium incense sticks.",
    boxImage: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=200&auto=format&fit=crop",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
        title: "Sparkling Home Sale",
        sub: "Disinfectants & Laundry liquids at wholesale rates.",
        code: "CLEANHOME",
        bgClass: "from-indigo-950 via-slate-900/90 to-transparent"
      }
    ]
  },
  { 
    name: "Fashion", 
    slug: "fashion",
    tagline: "Elegant Jaipuri Kurtis & traditional cotton wear",
    seoTitle: "Jaipuri Handblock Kurtis & Family Cotton Fashion Dholpur",
    seoDesc: "Explore authentic cotton Rajasthani print Kurtas, beautiful Anarkalis, children's traditional outfits, and Bandhani sarees at half price.",
    boxImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=200&auto=format&fit=crop",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
        title: "Jaipuri Prints Grandeur",
        sub: "Breathtaking handblock Kurtas & Bandhani Sarees. Minimum 50% OFF.",
        code: "JAIPURSTYLE",
        bgClass: "from-rose-950 via-slate-900/90 to-transparent"
      }
    ]
  }
];

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_SHOWCASE_DATA[0]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [promoCodeCopied, setPromoCodeCopied] = useState("");
  const [coupon, setCoupon] = useState(null)

  // Reset slide index on category switch
  useEffect(() => {
    setActiveSlide(0);
    setPromoCodeCopied("");
  }, [activeCategory]);

  // Auto-play interval for slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeCategory.slides.length > 1) {
        setActiveSlide(prev => (prev + 1) % activeCategory.slides.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setPromoCodeCopied(code);
    toast.success(`Promo Code "${code}" copied! Paste at checkout.`);
  };

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
    <section id="categories" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
      
   
    
      
      {/* ── Heading Block (Large and clear) ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100 pb-6 gap-4">
        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-black text-[#2874f0] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
            Interactive Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Explore what we sell
            <Flame size={28} className="text-orange-500 animate-pulse" />
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Browse our major category catalogs & exclusive Flipkart-style advertisement campaigns
          </p>
        </div>
        <Link 
          href="/shop" 
          className="text-xs sm:text-sm font-extrabold text-[#2874f0] hover:text-[#1a5ec4] transition-colors flex items-center gap-1 group bg-blue-50/60 hover:bg-blue-50 px-5 py-3 rounded-xl shrink-0"
        >
          View Full Store <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── Category Selectors (Horizontal list) ── */}
      <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-3 snap-x snap-mandatory">
        {CATEGORY_SHOWCASE_DATA.map((cat) => {
          const isActive = cat.slug === activeCategory.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat)}
              className={`flex flex-col items-center gap-3 p-3 rounded-2xl transition-all shrink-0 snap-start cursor-pointer ${
                isActive 
                  ? "bg-blue-50/50 scale-105 border border-blue-200/60 ring-4 ring-blue-50" 
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 transition-all ${
                isActive ? "border-[#2874f0] scale-102" : "border-gray-200"
              }`}>
                <img 
                  src={cat.boxImage} 
                  alt={`Indian ${cat.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-xs sm:text-sm font-bold tracking-wide text-center leading-tight ${
                isActive ? "text-[#2874f0]" : "text-gray-800"
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Banner Block (Full width, ultra premium) ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#0f1115] h-[340px] sm:h-[420px] md:h-[460px] lg:h-[500px]">
        <AnimatePresence mode="wait">
          {activeCategory.slides.map((slide, idx) => {
            if (idx !== activeSlide) return null;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full flex"
              >
                {/* Text Container */}
                <div className="w-full md:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col justify-center text-white bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#ffc200] text-gray-950 rounded-full px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-4 w-fit shadow">
                    <Sparkles size={14} fill="currentColor" /> Exclusive Campaign
                  </span>
                  
                  {/* Category Title Header */}
                  <h4 className="text-[#2874f0] text-sm sm:text-base md:text-lg font-black uppercase tracking-widest mb-1.5">
                    {activeCategory.name} Catalog
                  </h4>

                  {/* Main BIG Title */}
                  <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
                    {slide.title}
                  </h3>

                  {/* Subtitle / Tagline */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium mb-6 leading-relaxed max-w-xl">
                    {slide.sub}
                  </p>

                  {/* Action Link & Copy Code Grid */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Primary Button */}
                    <Link
                      href={`/shop?category=${activeCategory.slug}`}
                      className="bg-[#2874f0] hover:bg-[#1a5ec4] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
                    >
                      Shop {activeCategory.name} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Copy Promo Code Box */}
                    {coupon && (
                <button
                  onClick={() => navigator.clipboard.writeText(coupon.code)}
                  className="hidden sm:block bg-white text-[#2874f0] text-xs font-bold px-3 py-1.5 rounded-md hover:scale-105 active:scale-95 transition-all shadow"
                >
                  Apply Now
                </button>
              )}
                  </div>
                </div>

                {/* Right Side Image Backdrop (Responsive) */}
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full z-0 opacity-45 md:opacity-100">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Carousel Navigation buttons (Left/Right arrow) */}
        {activeCategory.slides.length > 1 && (
          <div className="absolute right-6 bottom-6 flex gap-2 z-20">
            <button
              onClick={() => setActiveSlide(prev => (prev - 1 + activeCategory.slides.length) % activeCategory.slides.length)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActiveSlide(prev => (prev + 1) % activeCategory.slides.length)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Dots Indicators */}
        {activeCategory.slides.length > 1 && (
          <div className="absolute bottom-6 left-8 sm:left-12 md:left-16 flex gap-2 z-20">
            {activeCategory.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeSlide ? "bg-[#ffc200] w-6" : "bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── SEO and District Trust Strip ── */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 text-xs sm:text-sm">
        <div className="flex items-start gap-3">
          <Info size={18} className="text-[#2874f0] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-extrabold text-gray-800 text-sm">
              Featured Directory Spotlight: <span className="font-mono text-xs text-[#2874f0]">{activeCategory.seoTitle}</span>
            </p>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-4xl">
              {activeCategory.seoDesc}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {["Dholpur District Delivery", "Wholesale Rates Online", "100% Sourced Fresh"].map((tag, i) => (
            <span key={i} className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-lg border border-emerald-100/80">
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

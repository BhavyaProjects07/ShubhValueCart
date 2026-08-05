import React, { useState, useEffect, useRef } from 'react';

import { 
  ChevronRight, ChevronLeft, ArrowRight
} from 'lucide-react';
import axios from 'axios';
import BestSelling from './BestSelling';
import CouponBanner from './Coupon';
import { useRouter } from "next/navigation";
import HeroSlider from './heroBanner';
import Link from 'next/link';
import Image from "next/image";
import Newsletter from './Newsletter';
import Deals from './Deals';
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
    image: "https://softsensbaby.com/cdn/shop/files/wipes-1.png?v=1748797533"
  },
  {
    name: "Toys & Kids",
    slug: "toys-kids",
    image: "https://todaysparent.mblycdn.com/tp/resized/2017/11/900x900/how-many-toys-do-kids-really-need-1280x960.jpg"
  },
  {
    name: "Household Essentials",
    slug: "household",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
  },
  {
    name: "Stationery",
    slug: "stationery",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsCmJKI-Z8jkL6FaIlvwwAOxZo_bMxb_joQ&s"
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



const splitBanners = [
  { id: 1, title: 'Staples & Cooking', subtitle: 'Starting at ₹1,999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4CAlq-V7qlxvzyWFr3D6SIRkT9lwJiS5-Q&s', color: 'from-[#0a6c3d]/90' ,cat : "staples-cooking"},
  { id: 2, title: 'Your Stationary Collection', subtitle: 'Up to 60% OFF', image: 'https://static.vecteezy.com/system/resources/thumbnails/071/157/463/small/back-to-school-supplies-background-colorful-stationery-calculator-and-blank-workspace-for-educational-and-creative-projects-photo.jpg?w=800', color: 'from-orange-800/90' , cat : "stationery"}
];



// --- COMPONENTS ---

const CustomNavbar = ({ categories }) => {
  const [isScrolled, setIsScrolled] = useState(false);
 
  const router = useRouter();


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  
  
}



const CategoryGrid = React.memo(({ categories = [] }) => {
  const router = useRouter(); // This line was already present in the user's last edit.
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 -mt-8 sm:-mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 backdrop-blur-lg ">
        
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
                    cat.color || "bg-[#eef5ee]"
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
                <span className="text-xs sm:text-sm font-bold text-gray-800 text-center group-hover:text-[#0a6c3d] transition-colors leading-tight">
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
                    }} className="bg-white text-gray-900 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold hover:bg-[#0a6c3d] hover:text-white transition-colors shadow-lg text-sm sm:text-base flex items-center gap-2">
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
                <button className="bg-white/20 hover:bg-white backdrop-blur-sm text-white hover:text-[#0a6c3d] border border-white/50 px-5 py-2 rounded-lg font-bold transition-all text-sm">
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
      
      className="min-h-screen bg-[#ffffff] font-sans overflow-x-hidden"
    >
      
      <CustomNavbar categories={categories}/>
      <div className="">
        <HeroSlider />
        <Deals />
        <CouponBanner />
        <BestSelling />
        <div className="mt-5 block lg:hidden px-3">
  <div className="grid grid-cols-3 gap-2">

    {/* Card 1 */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#e7efe1] p-3 h-[165px]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#0a6c3d]/10 blur-xl" />

      <div className="relative z-10">
        <h3 className="text-[12px] font-bold leading-4 text-gray-900">
          Savings on
          <br />
          Daily Essentials
        </h3>

        <p className="mt-2 text-[9px] uppercase text-gray-500">
          Up To
        </p>

        <div className="leading-none">
          <span className="text-[28px] font-black text-[#0a6c3d]">
            60%
          </span>
          <span className="ml-1 text-[13px] font-bold text-gray-900">
            OFF
          </span>
        </div>

        <Link
          href="/shop?category=daily-essentials"
          className="mt-3 inline-flex items-center gap-1 rounded-md bg-[#0a6c3d] px-2.5 py-1.5 text-[9px] font-bold text-white transition hover:bg-[#085531]"
        >
          Shop
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 h-[82px] w-[82px]">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/s1.png"
          alt="Daily essentials"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>

    {/* Card 2 */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#f2e9fb] p-3 h-[165px]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-400/15 blur-xl" />

      <div className="relative z-10">
        <h3 className="text-[12px] font-bold leading-4 text-gray-900">
          Personal Care
          <br />
          Fest
        </h3>

        <p className="mt-2 text-[9px] uppercase text-gray-500">
          Up To
        </p>

        <div className="leading-none">
          <span className="text-[28px] font-black text-purple-600">
            50%
          </span>
          <span className="ml-1 text-[13px] font-bold text-gray-900">
            OFF
          </span>
        </div>

        <Link
          href="/shop?category=personal-care"
          className="mt-3 inline-flex items-center gap-1 rounded-md bg-purple-600 px-2.5 py-1.5 text-[9px] font-bold text-white transition hover:bg-purple-700"
        >
          Shop
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 h-[82px] w-[82px]">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/s2.png"
          alt="Personal Care"
          fill
          className="object-contain object-bottom"
        />
      </div>
            </div>
            
                {/* Card 3 */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#fdecd8] p-3 h-[165px]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-400/15 blur-xl" />

      <div className="relative z-10">
        <h3 className="text-[12px] font-bold leading-4 text-gray-900">
          Home & Kitchen
          <br />
          Essentials
        </h3>

        <p className="mt-2 text-[9px] uppercase text-gray-500">
          Up To
        </p>

        <div className="leading-none">
          <span className="text-[28px] font-black text-orange-500">
            40%
          </span>
          <span className="ml-1 text-[13px] font-bold text-gray-900">
            OFF
          </span>
        </div>

        <Link
          href="/shop?category=home-kitchen"
          className="mt-3 inline-flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1.5 text-[9px] font-bold text-white transition hover:bg-orange-600"
        >
          Shop
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 h-[82px] w-[82px]">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/s3.png"
          alt="Home & Kitchen"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>

  </div>
        </div>
        


        <Link
      href="/shop?page=1&category=personal-care"
      className="block px-3 my-4"
    >
      <div className="relative aspect-[3/1] overflow-hidden rounded-2xl">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/ChatGPT%20Image%20Aug%205,%202026,%2011_49_10%20PM.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
        </Link>

        <Link
      href="/shop?page=1&maxPrice=10000&minDiscount=40"
      className="block px-3 my-4"
    >
      <div className="relative aspect-[3/1] overflow-hidden rounded-2xl">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/ChatGPT%20Image%20Aug%206,%202026,%2012_34_21%20AM.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
        </Link>
        
        

        
      <Newsletter />

        

        <Link
      href="/"
      className="block px-3 my-4"
    >
      <div className="relative aspect-[3/1] overflow-hidden rounded-2xl">
        <Image
          src="https://ik.imagekit.io/rsjsqdge7/ChatGPT%20Image%20Aug%206,%202026,%2012_56_57%20AM.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
        </Link>
        
        
        
        
      </div>
    </div>
  );
}
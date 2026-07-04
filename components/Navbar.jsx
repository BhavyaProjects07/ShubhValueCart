'use client'
import {
  Search,
  ShoppingCart,
  PhoneCallIcon,
  Menu,
  Gift,
  X,
  ShoppingBag,
  Info,
  ChevronRight,
  Shirt,
  Smartphone,
  Sparkles,
  Laptop,
  Baby,
  Home,
  Apple,
  BookOpen,
  Heart,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCart } from "@/lib/features/cart/cartSlice";
import { assets } from "@/assets/assets";
import Image from "next/image"
import {useUser , useClerk , UserButton , useAuth} from "@clerk/nextjs";
import { PackageIcon, Store , MapPin , ChevronDown } from "lucide-react";
import axios from "axios";
import LocationModal from "./LocationModal";


const NavLink = ({ href, children, delay = 0 }) => {
    return (
        <Link
            href={href}
            className="relative group text-sm font-semibold tracking-wide text-gray-600 hover:text-[#1D1D1F] transition-colors duration-300"
            style={{
                animation: `fadeInUp 0.6s ease-out ${delay}s forwards`,
                opacity: 0,
            }}
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1D1D1F] group-hover:w-full transition-all duration-300 ease-out rounded-full" />
        </Link>
    )
}

const Navbar = () => {
    const { getToken } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const { user } = useUser()
    const {openSignIn} = useClerk()
    const router = useRouter();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    // Fallback for cartCount if redux is not set up in the environment
    const cartCount = useSelector(state => state?.cart?.total || 0)
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Category bar (below navbar) + hide-on-scroll-down / show-on-scroll-up
    const [categories, setCategories] = useState([]);
    const [showCategoryBar, setShowCategoryBar] = useState(true);
    const lastScrollY = useRef(0);

  const categoryIcons = {
  "Groceries": Apple,
  "Cooking": Package,
  "Body Care": Heart,
  "Home Cleaning": Home,
  "Baby Care": Baby,
  "Toys": Gift,
  "Household": Home,
  "Stationery": BookOpen,
  "Electronics": Laptop,
  "Fashion": Shirt,
  "Mobiles": Smartphone,
  "Beauty": Sparkles,
};
    const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])
    useEffect(() => {
  if (!mounted) return;

  // User logged out
  if (!user) {
    dispatch(clearCart());
    return;
  }

        
  // User logged in
  dispatch(fetchCart({ getToken }));

    }, [user, mounted]);
    
    useEffect(() => {
  const fetchDefaultAddress = async () => {
    if (!user) return;

    try {
      const token = await getToken();

      const { data } = await axios.get("/api/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const defaultAddress =
        data.addresses?.find((a) => a.isDefault) ||
        data.addresses?.[0];

      setSelectedAddress(defaultAddress || null);
    } catch (error) {
      console.error("Address fetch error:", error);
    }
  };

  fetchDefaultAddress();
}, [user]);

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        if (!user) {
    setIsAdmin(false);
    setIsSeller(false);
    return;
}

            const fetchRoles = async () => {
                try {
                    const token = await getToken()
                    if (!token) return;

                    // Admin check
                    try {
                        await axios.get("/api/admin/is-admin", {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                        setIsAdmin(true)
                    } catch {
                        setIsAdmin(false)
                    }

                    // Seller check
                    const sellerRes = await axios.get(
                        "/api/store/is-seller",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                        );

                    setIsSeller(!!sellerRes.data?.isSeller)

                } catch (err) {
                    console.error("Role check failed", err)
                }
            }

        fetchRoles()
    }, [user])

    // Fetch categories for the mini category bar
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // NOTE: adjust the endpoint / response shape here if your
                // categories API differs (mirrors the banners fetch pattern
                // used elsewhere: { categories: [{ name, slug }, ...] })
                const { data } = await axios.get("/api/categories");
                setCategories(data.categories || data || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        fetchCategories();
    }, []);

    // Hide category bar on scroll down, show it on scroll up (Flipkart-style)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 80) {
                // Always show near the top of the page
                setShowCategoryBar(true);
            } else if (currentScrollY > lastScrollY.current + 5) {
                setShowCategoryBar(false); // scrolling down
            } else if (currentScrollY < lastScrollY.current - 5) {
                setShowCategoryBar(true); // scrolling up
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        if (!search.trim()) return
        router.push(`/shop?search=${encodeURIComponent(search.trim())}`)
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .nav-logo {
                    animation: slideInDown 0.8s ease-out;
                }

                .search-input-wrapper {
                    animation: fadeInUp 0.6s ease-out 0.2s forwards;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .search-input-wrapper:focus-within {
                    transform: scale(1.02);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-200/50 pointer-events-auto font-inter ">
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-[1400px] mx-auto py-4 transition-all duration-500">

                        {/* Desktop Logo */}
                        <Link
                            href="/"
                            className="nav-logo relative text-2xl font-extrabold tracking-tighter text-[#1D1D1F] hover:scale-105 transition-transform duration-300 hidden sm:flex items-center gap-2"
                        >
                            {/* Assuming assets.FrostWayne is available, otherwise fallback to text */}
                            {assets?.logo ? (
                                <Image src={assets.logo} alt="Logo" width={120} height={40} className="object-contain" />
                            ) : (
                                <span>Shubh Value Cart</span>
                            )}
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-10">
                            <NavLink href="/" delay={0}>Home</NavLink>
                            <NavLink href="/shop" delay={0.1}>Shop</NavLink>
                            
                            <button
  onClick={() => setShowLocationModal(true)}
  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:border-green-500 hover:shadow-md active:scale-95"
>
  {/* Location Icon */}
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
    <MapPin
      size={18}
      className="fill-green-600 text-green-600"
    />
  </div>

  {/* Address */}
  <div className="flex flex-col items-start leading-tight">

    <span className="text-[11px] font-medium text-gray-500">
      Deliver to
    </span>

    {selectedAddress ? (
      <>
        <span className="max-w-[170px] truncate text-sm font-semibold text-gray-900">
          {selectedAddress.name}
        </span>

        <span className="max-w-[170px] truncate text-xs text-gray-500">
          {selectedAddress.locality ||
            selectedAddress.street},{" "}
          {selectedAddress.city}
        </span>
      </>
    ) : (
      <span className="text-sm font-semibold text-gray-900">
        Add Address
      </span>
    )}
  </div>

  <ChevronDown
    size={18}
    className="ml-1 text-gray-500 transition-transform duration-200 group-hover:rotate-180"
  />
                            </button>

                            <form 
                                onSubmit={handleSearch} 
                                className="search-input-wrapper hidden xl:flex items-center w-64 text-sm gap-2 bg-gray-100/80 px-4 py-2.5 rounded-full hover:bg-gray-200/80 transition-all duration-300 border border-transparent focus-within:border-gray-300 focus-within:bg-white"
                            >
                                <Search size={16} className="text-gray-500 transition-transform duration-300 group-hover:rotate-90" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-gray-500 text-[#1D1D1F] transition-colors duration-300" 
                                    type="text" 
                                    placeholder="Search products..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    required 
                                />
                            </form>

                            <Link 
                                href="/cart" 
                                className="relative flex items-center gap-2 text-gray-600 group transition-all duration-300 hover:scale-105"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out 0.4s forwards`,
                                    opacity: 0,
                                }}
                            >
                                <div className="relative p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                                    <ShoppingCart size={18} className="text-[#1D1D1F] transition-transform duration-300 group-hover:rotate-12" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white bg-[#1D1D1F] size-4.5 flex items-center justify-center rounded-full shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="font-semibold text-sm group-hover:text-[#1D1D1F] transition-colors duration-300">Cart</span>
                            </Link>

                            {
                            !mounted ? (
                                <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse" />
                            ) : !user ? (
                                <div className="flex items-center gap-3">
                                {/* Clerk Login */}
                                

                                {/* 🔥 NEW PHONE LOGIN */}
                                <button
                                    onClick={() => router.push("/phone-signup")}
                                    className="px-5 py-2 border border-[#1D1D1F] text-[#1D1D1F] text-sm font-semibold rounded-full hover:bg-gray-100 transition"
                                >
                                    Sign Up
                                </button>
                                </div>
                            ) : (
                                <div className="hover:scale-105 transition-transform">
                                <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 shadow-sm" } }}>
                                    <UserButton.MenuItems>
                                         <UserButton.Action
                                                    labelIcon={<ShoppingCart size={16} />}
                                                    label="Cart"
                                                    onClick={() => router.push("/cart")}
                                                />
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="My Orders"
                                                    onClick={() => router.push("/orders")}
                                                />
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="About Us"
                                                    onClick={() => router.push("/about")}
                                                        />
                                                
                                                {isSeller && (
                                                <UserButton.Action
                                                    labelIcon={<Store size={16} />}
                                                    label="Store Dashboard"
                                                    onClick={() =>
                                                    router.push("/admin-verify-svc?redirect=/store")
}
                                                />
                                                )}
                                                {isAdmin && (
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="Admin Panel"
                                                    onClick={() =>
  router.push("/admin-verify-svc?redirect=/admin")
}
                                                />
                                                )}              
                                                        
                                    </UserButton.MenuItems>
                                </UserButton>
                                                
                                                
                                </div>
                            )
                            }
                                                <div
  className="relative"
  onMouseEnter={() => setMenuOpen(true)}
  onMouseLeave={() => setMenuOpen(false)}
>
  <button className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
    <Menu size={20} />
  </button>

  {menuOpen && (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">

      <Link
        href="/orders"
        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <PackageIcon size={18} />
          <span>My Orders</span>
        </div>
        <ChevronRight size={16} />
      </Link>

      <Link
        href="/terms"
        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <Gift size={18} />
          <span>terms & conditions</span>
        </div>
        <ChevronRight size={16} />
      </Link>

      <Link
        href="/about"
        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <Info size={18} />
          <span>About Us</span>
        </div>
        <ChevronRight size={16} />
      </Link>

      <Link
        href="/contact"
        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <PhoneCallIcon size={18} />
          <span>Contact Us</span>
        </div>
        <ChevronRight size={16} />
      </Link>

      {isSeller && (
        <Link
          href="/admin-verify-svc?redirect=/store"
          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-t"
        >
          <div className="flex items-center gap-3">
            <Store size={18} />
            <span>Store Dashboard</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      )}

      {isAdmin && (
        <Link
          href="/admin-verify-svc?redirect=/admin"
          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <PackageIcon size={18} />
            <span>Admin Panel</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )}
                                                </div>
                        </div>

                        {/* Mobile Nav */}
                        <div className="sm:hidden flex items-center justify-between w-full opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">

    {/* Logo */}
    <Link
        href="/"
        className="flex items-center font-extrabold tracking-tighter text-xl text-[#1D1D1F]"
    >
        {assets?.logo ? (
            <Image
                src={assets.logo}
                alt="Shubh Value Cart"
                width={67}
                height={21}
                priority
                className="object-contain"
            />
        ) : (
            <span>Shubh Value Cart</span>
        )}
    </Link>

    {/* Right Side */}
                            <div className="flex items-center gap-2">
                                
                                   <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 shadow-sm" } }}>
                                    <UserButton.MenuItems>
                                         <UserButton.Action
                                                    labelIcon={<ShoppingCart size={16} />}
                                                    label="Cart"
                                                    onClick={() => router.push("/cart")}
                                                />
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="My Orders"
                                                    onClick={() => router.push("/orders")}
                                                />
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="About Us"
                                                    onClick={() => router.push("/about")}
                                                        />
                                                
                                                {isSeller && (
                                                <UserButton.Action
                                                    labelIcon={<Store size={16} />}
                                                    label="Store Dashboard"
                                                    onClick={() =>
                                                    router.push("/admin-verify-svc?redirect=/store")
}
                                                />
                                                )}
                                                {isAdmin && (
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="Admin Panel"
                                                    onClick={() =>
  router.push("/admin-verify-svc?redirect=/admin")
}
                                                />
                                                )}              
                                                        
                                    </UserButton.MenuItems>
                                </UserButton>

        {/* Hamburger */}
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

    </div>
</div>

                    </div>
                </div>

                {/* Mobile Address + Search — Flipkart style (mobile only) */}
                <div className="sm:hidden px-4 pb-3 space-y-2">

                    {/* Address pill + Cart + Shop — all in one row */}
                    <div className="flex items-center gap-2">

                        {/* Address pill — single line, like Flipkart */}
                        <button
                            onClick={() => setShowLocationModal(true)}
                            className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-left transition hover:bg-gray-200 active:scale-[0.99]"
                        >
                            <MapPin size={16} className="shrink-0 fill-green-600 text-green-600" />
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
                                {selectedAddress
                                    ? `${selectedAddress.name}, ${selectedAddress.locality || selectedAddress.street}, ${selectedAddress.city}`
                                    : "Add Address"}
                            </span>
                            <ChevronDown size={16} className="shrink-0 text-gray-500" />
                        </button>

                        {/* Cart icon */}
                        <Link
                            href="/cart"
                            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <ShoppingCart size={18} className="text-[#1D1D1F]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[9px] font-bold text-white bg-[#1D1D1F] size-4 flex items-center justify-center rounded-full shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Shop icon */}
                        <Link
                            href="/shop"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <ShoppingBag size={18} className="text-[#1D1D1F]" />
                        </Link>

                    </div>

                    {/* Search bar — collapses on scroll down, reappears on scroll up (same behavior as the category bar) */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            showCategoryBar ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2.5"
                        >
                            <Search size={18} className="shrink-0 text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-transparent text-sm font-medium text-[#1D1D1F] outline-none placeholder-gray-500"
                            />
                        </form>
                    </div>

                </div>

                {/* Mini Category Bar — collapses on scroll down, reappears on scroll up */}
                <div
  className={`border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ${
    showCategoryBar ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="max-w-[1600px] mx-auto flex items-center gap-10 overflow-x-auto hide-scrollbar px-6">

    {/* All */}
    <button
      onClick={() => router.push("/shop")}
      className="group flex min-w-[70px] flex-col items-center py-0"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 transition group-hover:bg-[#2874f0]">
        <Menu className="h-5 w-5 text-[#2874f0] group-hover:text-white" />
      </div>

      <span className="mt-1 text-xs font-medium text-gray-800">
        All
      </span>

      <div className="mt-1 h-[3px] w-8 rounded-full bg-[#2874f0]" />
    </button>

    {categories.slice(0, 10).map((cat, idx) => {
      const Icon = categoryIcons[cat.name] || Package;

      return (
        <button
          key={idx}
          onClick={() => router.push(`/shop?category=${cat.slug}`)}
          className="group flex min-w-[72px] flex-col items-center py-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full transition group-hover:bg-blue-50">
            <Icon
              size={22}
              className="text-gray-700 transition-all group-hover:scale-110 group-hover:text-[#2874f0]"
            />
          </div>

          <span className="mt-1 whitespace-nowrap text-xs font-medium text-gray-800 transition-colors group-hover:text-[#2874f0]">
            {cat.name}
          </span>

          <div className="mt-1 h-[3px] w-0 rounded-full bg-[#2874f0] transition-all duration-300 group-hover:w-8" />
        </button>
      );
    })}
                    </div>
                    
                    
                </div>

                

                

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
    <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg animate-[fadeInUp_0.25s_ease-out]">

        <Link
            href="/orders"
            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
        >
            <div className="flex items-center gap-3">
                <PackageIcon size={18} />
                <span>My Orders</span>
            </div>
            <ChevronRight size={16} />
                        </Link>
                        
                        

        <Link
            href="/shop"
            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
        >
            <div className="flex items-center gap-3">
                <ShoppingBag size={18} />
                <span>Shop</span>
            </div>
            <ChevronRight size={16} />
        </Link>

        <Link
            href="/about"
            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
        >
            <div className="flex items-center gap-3">
                <Info size={18} />
                <span>About Us</span>
            </div>
            <ChevronRight size={16} />
        </Link>

        <Link
            href="/contact"
            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
        >
            <div className="flex items-center gap-3">
                <PhoneCallIcon size={18} />
                <span>Contact Us</span>
            </div>
            <ChevronRight size={16} />
                        </Link>
                        
                        

        {isSeller && (
            <Link
                href="/admin-verify-svc?redirect=/store"
                className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
            >
                <div className="flex items-center gap-3">
                    <Store size={18} />
                    <span>Store Dashboard</span>
                </div>
                <ChevronRight size={16} />
            </Link>
        )}

        {isAdmin && (
            <Link
                href="/admin-verify-svc?redirect=/admin"
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
            >
                <div className="flex items-center gap-3">
                    <PackageIcon size={18} />
                    <span>Admin Panel</span>
                </div>
                <ChevronRight size={16} />
            </Link>
        )}

    </div>
)}
        </nav>
        


        <div
  className="
    h-[125px]
    sm:h-[85px]
    lg:h-[78px]
  "
/>
            <LocationModal
  isOpen={showLocationModal}
  onClose={() => setShowLocationModal(false)}
  onDetectLocation={() => {
    console.log("Detect location...");
  }}
/>
        </>
    )
}
export default Navbar
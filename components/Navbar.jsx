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
  Truck,
  User,
  PlayCircle,
  Bell,
  Mic,
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


const NavLink = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="relative group text-[13px] font-bold uppercase tracking-wide text-gray-700 hover:text-[#0a6c3d] transition-colors duration-200 whitespace-nowrap"
        >
            {children}
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#0a6c3d] group-hover:w-full transition-all duration-300 ease-out rounded-full" />
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
    const mobileSearchInputRef = useRef(null);

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

    // Placeholder until a notifications API is wired up — badge only renders when > 0
    const [notificationCount, setNotificationCount] = useState(0);

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

    // Shared UserButton menu (used in both desktop + mobile slots)
    const AccountMenuItems = (
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
                    onClick={() => router.push("/admin-verify-svc?redirect=/store")}
                />
            )}
            {isAdmin && (
                <UserButton.Action
                    labelIcon={<PackageIcon size={16} />}
                    label="Admin Panel"
                    onClick={() => router.push("/admin-verify-svc?redirect=/admin")}
                />
            )}
        </UserButton.MenuItems>
    );

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
                    animation: fadeInUp 0.5s ease-out 0.1s forwards;
                    opacity: 0;
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-auto font-inter">

                {/* Top strip: announcement / delivery / app download (desktop) */}
                <div className="hidden lg:flex items-center justify-between bg-[#0a6c3d] text-white text-xs px-6 py-1.5">
  {/* WhatsApp Contact Link */}
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <a 
                        href="https://wa.me/919509086545" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 text-white hover:text-green-300"
                        >
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                            alt="WhatsApp" 
                            className="w-4 h-4"
                        />
                        Contact us on WhatsApp
                        </a>
                    </span>

                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Truck size={14} />
                        Free Delivery on Orders Above ₹500
                    </span>

                    <span className="flex items-center gap-2 whitespace-nowrap">
                        Download Our App
                        <PlayCircle size={16} />
                        <Apple size={16} />
                    </span>
                    </div>


                {/* Top strip: compact single-line version (mobile / tablet) */}
                

                {/* Main header row (desktop / tablet only — mobile has its own header block below) */}
                <div className="hidden lg:block bg-white border-b border-gray-200/70">
                    <div className="max-w-[1400px] mx-auto flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-3">

                        {/* Logo */}
                        <Link href="/" className="nav-logo flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
                            {assets?.logo ? (
                                <Image src={assets.logo} alt="Shubh Value Cart" width={120} height={40} className="object-contain h-7 w-auto sm:h-10" />
                            ) : (
                                <>
                                    <ShoppingCart size={26} strokeWidth={2.4} className="text-orange-500 shrink-0 sm:w-[30px] sm:h-[30px]" />
                                    <div className="leading-none">
                                        <div className="text-base sm:text-2xl font-extrabold text-[#0a6c3d] tracking-tight">SHUBH</div>
                                        <div className="text-[9px] sm:text-xs font-extrabold text-orange-500 tracking-[0.18em] -mt-0.5">VALUE CART</div>
                                    </div>
                                </>
                            )}
                        </Link>

                        {/* Search (desktop) */}
                        <form
                            onSubmit={handleSearch}
                            className="search-input-wrapper flex-1 hidden md:flex items-stretch max-w-2xl border border-gray-300 rounded-sm overflow-hidden"
                        >
                            <button
                                type="button"
                                className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-300 text-sm text-gray-600 whitespace-nowrap hover:bg-gray-100 transition-colors"
                            >
                                All Categories <ChevronDown size={14} />
                            </button>
                            <input
                                className="flex-1 min-w-0 px-3 py-2 text-sm outline-none text-[#1D1D1F] placeholder-gray-400"
                                type="text"
                                placeholder="Search for products, brands and more..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <button type="submit" className="flex items-center justify-center px-4 bg-[#0a6c3d] hover:bg-[#085531] transition-colors">
                                <Search size={18} className="text-white" />
                            </button>
                        </form>

                        {/* Right-side info icons (desktop) */}
                        <div className="hidden lg:flex items-center gap-6 shrink-0 ml-auto">

                            {/* Store Locator / Deliver-to — reuses the existing address selection logic */}
                            <button
                                onClick={() => setShowLocationModal(true)}
                                className="flex items-center gap-2 text-gray-700 hover:text-[#0a6c3d] transition-colors"
                            >
                                <MapPin size={20} />
                                <div className="leading-tight text-left">
                                    <div className="text-[13px] font-semibold text-gray-900">
                                        {selectedAddress ? "Deliver to" : "Store Locator"}
                                    </div>
                                    <div className="text-[11px] text-gray-500 max-w-[140px] truncate">
                                        {selectedAddress
                                            ? `${selectedAddress.name}, ${selectedAddress.locality || selectedAddress.street}`
                                            : "Find a Store"}
                                    </div>
                                </div>
                            </button>

                            {/* My Account */}
                            {!mounted ? (
                                <div className="w-24 h-9 bg-gray-200 rounded-md animate-pulse" />
                            ) : !user ? (
                                <button
                                    onClick={() => router.push("/phone-signup")}
                                    className="flex items-center gap-2 text-gray-700 hover:text-[#0a6c3d] transition-colors"
                                >
                                    <User size={20} />
                                    <div className="leading-tight text-left">
                                        <div className="text-[13px] font-semibold text-gray-900">My Account</div>
                                        <div className="text-[11px] text-gray-500">Login / Register</div>
                                    </div>
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 shadow-sm" } }}>
                                        {AccountMenuItems}
                                    </UserButton>
                                    <div className="leading-tight text-left">
                                        <div className="text-[13px] font-semibold text-gray-900">My Account</div>
                                        <div className="text-[11px] text-gray-500 max-w-[110px] truncate">
                                            {user?.firstName || "Welcome back"}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* My Cart */}
                            <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-[#0a6c3d] transition-colors">
                                <div className="relative">
                                    <ShoppingCart size={22} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full w-4 h-4">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <div className="leading-tight text-left">
                                    <div className="text-[13px] font-semibold text-gray-900">My Cart</div>
                                    <div className="text-[11px] text-gray-500">₹{Number(cartCount || 0).toFixed(2)}</div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop logo/search/icons above stay exactly as-is; mobile now renders its own dedicated header below */}
                    </div>
                </div>

                {/* ============================================================ */}
                {/*  MOBILE APP-STYLE HEADER (phones/tablets only — lg:hidden)    */}
                {/*  One combined top row (menu+logo / location / bell+cart),     */}
                {/*  matching the reference 1:1 — no separate category strip.     */}
                {/* ============================================================ */}
                <div className="lg:hidden bg-gradient-to-b from-[#e0ecff] to-white overflow-hidden -mt-px ">

                    {/* Row 1 — hamburger + logo (left) · delivery location (center) · bell + cart (right) */}
                    <div className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5">
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button
                                onClick={() => setMobileMenuOpen((v) => !v)}
                                aria-label="Menu"
                                className="w-9 h-9 -ml-1.5 flex items-center justify-center rounded-full text-gray-800 active:bg-gray-100 transition-colors"
                            >
                                {mobileMenuOpen ? <X size={21} strokeWidth={2.2} /> : <Menu size={21} strokeWidth={2.2} />}
                            </button>

                            <Link href="/" className="flex items-center active:opacity-70 transition-opacity">
                                {assets?.logo ? (
                                    <Image src={assets.logo} alt="Shubh Value Cart" width={100} height={32} className="object-contain h-6 w-auto" />
                                ) : (
                                    <div className="leading-none">
                                        <div className="text-[16px] font-extrabold text-gray-900 tracking-tight">Shubh</div>
                                        <div className="text-[8.5px] font-extrabold text-blue-600 tracking-[0.18em] -mt-0.5">VALUE CART</div>
                                    </div>
                                )}
                            </Link>
                        </div>

                        <button
                            onClick={() => setShowLocationModal(true)}
                            aria-label="Change delivery location"
                            className="flex items-center gap-1 min-w-0 flex-1 justify-center active:opacity-60 transition-opacity"
                        >
                            <MapPin size={14} className="shrink-0 text-blue-600" />
                            <span className="min-w-0 truncate text-[12.5px] font-semibold text-gray-800">
                                {selectedAddress
                                    ? `Delivering to ${selectedAddress.locality || selectedAddress.street || selectedAddress.name}`
                                    : "Store Locator"}
                            </span>
                            <ChevronDown size={14} className="shrink-0 text-gray-400" />
                        </button>

                        <div className="flex items-center gap-0.5 shrink-0 -mr-1.5">
                            <button
                                aria-label="Notifications"
                                className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-800 active:bg-gray-100 transition-colors"
                            >
                                <Bell size={20} strokeWidth={2} />
                                {notificationCount > 0 && (
                                    <span className="absolute top-1 right-1 min-w-[15px] h-[15px] px-[3px] flex items-center justify-center text-[9px] font-bold text-white bg-blue-500 rounded-full ring-2 ring-white">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            <Link
                                href="/cart"
                                aria-label="Cart"
                                className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-800 active:bg-gray-100 transition-colors"
                            >
                                <ShoppingCart size={20} strokeWidth={2} />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 min-w-[15px] h-[15px] px-[3px] flex items-center justify-center text-[9px] font-bold text-white bg-blue-500 rounded-full ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Row 2 — always-visible pill search bar, app-style (no expand/collapse) */}
                    <div className="px-4 pb-3.5">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-4 py-2.5 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all"
                        >
                            <Search size={18} className="shrink-0 text-gray-500" />
                            <input
                                ref={mobileSearchInputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for products, brands & more..."
                                className="flex-1 min-w-0 bg-transparent text-[13.5px] text-[#1D1D1F] outline-none placeholder-text-gray-500"
                            />
                            <button type="submit" aria-label="Voice search" className="shrink-0 text-gray-500 active:text-blue-600 transition-colors">
                                <Mic size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Category links bar — collapses on scroll down, reappears on scroll up */}
                <div
                    className={`hidden lg:block bg-white border-b border-gray-200/70 overflow-visible transition-all duration-300 ${
                        showCategoryBar ? "max-h-14 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="max-w-[1400px] mx-auto flex items-center gap-8 px-6">

                        <div
                            className="relative"
                            onMouseEnter={() => setMenuOpen(true)}
                            onMouseLeave={() => setMenuOpen(false)}
                        >
                            <button className="flex items-center gap-2 bg-[#0a6c3d] hover:bg-[#085531] text-white text-sm font-bold tracking-wide px-4 py-2.5 transition-colors">
                                <Menu size={16} /> ALL CATEGORIES
                            </button>

                            {menuOpen && (
                                <div className="absolute left-0 top-full w-72 bg-white shadow-2xl border border-gray-100 rounded-b-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                    {categories.length > 0 ? (
                                        categories.slice(0, 12).map((cat, idx) => {
                                            const Icon = categoryIcons[cat.name] || Package;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => router.push(`/shop?category=${cat.slug}`)}
                                                    className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-gray-50"
                                                >
                                                    <Icon size={18} className="text-[#0a6c3d]" />
                                                    <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <button
                                            onClick={() => router.push("/shop")}
                                            className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-50"
                                        >
                                            <Package size={18} className="text-[#0a6c3d]" />
                                            <span className="text-sm font-medium text-gray-800">Browse all products</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <nav className="flex items-center gap-7">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/#offers">Offers</NavLink>
                            <NavLink href="/shop?category=fashion">Men</NavLink>
                            <NavLink href="/shop?category=fashion">Women</NavLink>
                            <NavLink href="/shop?category=toys">Kids</NavLink>
                            <NavLink href="/shop?category=grocery">Grocery</NavLink>
                            <NavLink href="/shop?category=household-essentials">Home & Kitchen</NavLink>
                            <NavLink href="/shop?category=electronics">Electronics</NavLink>
                            <NavLink href="/shop?category=personal-care">Personal Care</NavLink>
                            <NavLink href="/shop">More</NavLink>
                        </nav>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white rounded-t-[22px] shadow-[0_-4px_24px_rgba(15,23,42,0.12)] animate-[fadeInUp_0.25s_ease-out] overflow-hidden">

                        {/* Greeting header */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-[#f5f7f4] border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-[#0a6c3d]/10 flex items-center justify-center shrink-0">
                                <User size={18} className="text-[#0a6c3d]" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-bold text-gray-900 truncate">
                                    {user ? (user?.firstName ? `Hi, ${user.firstName}` : "Welcome back") : "Welcome to Shubh Value Cart"}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {user ? "Manage your account & orders" : "Sign in for faster checkout"}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/orders"
                            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <PackageIcon size={18} className="text-[#0a6c3d]" />
                                <span className="text-sm font-medium text-gray-800">My Orders</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>

                        <Link
                            href="/shop"
                            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={18} className="text-[#0a6c3d]" />
                                <span className="text-sm font-medium text-gray-800">Shop</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>

                        <Link
                            href="/terms"
                            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <Gift size={18} className="text-[#0a6c3d]" />
                                <span className="text-sm font-medium text-gray-800">Terms & Conditions</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>

                        <Link
                            href="/about"
                            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <Info size={18} className="text-[#0a6c3d]" />
                                <span className="text-sm font-medium text-gray-800">About Us</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="flex items-center gap-3">
                                <PhoneCallIcon size={18} className="text-[#0a6c3d]" />
                                <span className="text-sm font-medium text-gray-800">Contact Us</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>

                        {isSeller && (
                            <Link
                                href="/admin-verify-svc?redirect=/store"
                                className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <Store size={18} className="text-[#0a6c3d]" />
                                    <span className="text-sm font-medium text-gray-800">Store Dashboard</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                href="/admin-verify-svc?redirect=/admin"
                                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <PackageIcon size={18} className="text-[#0a6c3d]" />
                                    <span className="text-sm font-medium text-gray-800">Admin Panel</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            <div
                className="
                    h-[124px]
                    lg:h-[168px]
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
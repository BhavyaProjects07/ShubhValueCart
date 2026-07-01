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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCart } from "@/lib/features/cart/cartSlice";
import { assets } from "@/assets/assets";
import Image from "next/image"
import {useUser , useClerk , UserButton , useAuth} from "@clerk/nextjs";
import { PackageIcon, Store } from "lucide-react";
import axios from "axios";

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
    
    // Fallback for cartCount if redux is not set up in the environment
    const cartCount = useSelector(state => state?.cart?.total || 0)
    const dispatch = useDispatch();

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
            `}</style>

            <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-200/50 pointer-events-auto font-inter">
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
                            <NavLink href="/about" delay={0.2}>About</NavLink>
                            <NavLink href="/contact">Contact US</NavLink>

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
                                                    onClick={() => router.push("/store")}
                                                />
                                                )}
                                                {isAdmin && (
                                                <UserButton.Action
                                                    labelIcon={<PackageIcon size={16} />}
                                                    label="Admin Panel"
                                                    onClick={() => router.push("/admin")}
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
          href="/store"
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
          href="/admin"
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

        {/* Search */}
        <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
            <Search size={18} />
        </button>

        {/* Cart */}
        <button
            onClick={() => router.push("/cart")}
            className="relative p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
            <ShoppingCart size={18} />

            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1D1D1F] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartCount}
                </span>
            )}
        </button>

        {/* User */}
        {user ? (
            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "w-9 h-9 shadow-sm",
                    },
                }}
            />
        ) : (
            <button
                onClick={() => router.push("/phone-signup")}
                className="px-4 py-2 border rounded-full text-sm"
            >
                Sign Up
            </button>
        )}

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

                {/* Mobile Search Bar Dropdown */}
                {mobileSearchOpen && (
                    <form
                        onSubmit={(e) => {
                            handleSearch(e)
                            setMobileSearchOpen(false)
                        }}
                        className="sm:hidden px-6 pb-4 animate-[fadeInUp_0.3s_ease-out]"
                    >
                        <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200 shadow-inner">
                            <Search size={18} className="text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-transparent outline-none text-sm font-medium text-[#1D1D1F] placeholder-gray-500"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setMobileSearchOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                ✕
                            </button>
                        </div>
                    </form>
                )}

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
                href="/store"
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
                href="/admin"
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
        </>
    )
}
export default Navbar
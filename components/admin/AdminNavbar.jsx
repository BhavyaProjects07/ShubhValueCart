"use client"
import Link from "next/link"
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between px-12 py-3 border-b border-[#fff] bg-gradient-to-r from-[#fff] to-[#fff] transition-all">
      <Link href="/" className="relative text-4xl font-semibold text-[#6b5d52]">
        <Image src={assets.logo || "/placeholder.svg"} alt="Logo" className="w-36 " />
      </Link>
      <div className="flex items-center gap-3 text-[#6b5d52]">
        <Link href="/store" className="text-lg font-medium hover:text-[#2874f0] transition-colors">
          <p>Store Dashboard</p>
        </Link>
        <p>Hi, {user?.name || "Admin"}</p>
        <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">Logout</button>
      </div>
    </div>
  )
}

export default AdminNavbar


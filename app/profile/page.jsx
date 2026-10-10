"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, PackageIcon, Store, LogOut, ChevronLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) {
        return null; // or a loading spinner
    }

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
        try {
            await axios.delete("/api/auth/delete-account");
            toast.success("Account deleted successfully");
            logout();
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Failed to delete account");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center gap-3">
                <button onClick={() => router.back()} className="text-gray-700 p-1">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
            </div>

            {/* Profile Info */}
            <div className="bg-white p-6 mb-2 border-b">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0a6c3d]/10 flex items-center justify-center shrink-0">
                        {user?.image ? (
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <User size={32} className="text-[#0a6c3d]" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500 mt-1">{user.phone}</p>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="bg-white border-y">
                <Link href="/orders" className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <PackageIcon size={20} className="text-[#0a6c3d]" />
                        <span className="font-medium text-gray-800">My Orders</span>
                    </div>
                </Link>
                {/* Add logic for isSeller or isAdmin if needed via API or context, but usually /admin or /store verifies it anyway */}
                <Link href="/admin-verify-svc?redirect=/store" className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <Store size={20} className="text-[#0a6c3d]" />
                        <span className="font-medium text-gray-800">Store Dashboard</span>
                    </div>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-600 transition-colors border-b">
                    <div className="flex items-center gap-3">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </div>
                </button>
                <button onClick={handleDeleteAccount} className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-600 transition-colors">
                    <div className="flex items-center gap-3">
                        <Trash2 size={20} />
                        <span className="font-medium">Delete Account</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

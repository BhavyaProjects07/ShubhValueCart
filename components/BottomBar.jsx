"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Grid2x2,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";

export default function BottomBar() {
  const pathname = usePathname();

  const items = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Shop",
      href: "/shop",
      icon: ShoppingBag,
    },
    {
      name: "Categories",
      href: "/#categories",
      icon: Grid2x2,
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] block border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <div className="grid grid-cols-5 h-[68px]">
          {items.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center"
              >
                <Icon
                  size={22}
                  className={`transition-all ${
                    active
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                  strokeWidth={2.2}
                />

                <span
                  className={`mt-1 text-[11px] font-medium ${
                    active
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* WhatsApp */}
          <a
            href="https://wa.me/" // <-- Add your number here
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center"
          >
            <MessageCircle
              size={22}
              className="text-[#25D366]"
              strokeWidth={2.2}
            />

            <span className="mt-1 text-[11px] font-medium text-[#25D366]">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Safe area for iPhone */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
    </>
  );
}
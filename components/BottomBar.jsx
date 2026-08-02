"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid2x2,
  Tag,
  ShoppingBag,
  User,
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
      name: "Categories",
      href: "/categories",
      icon: Grid2x2,
    },
    {
      name: "Deals",
      href: "/#deals",
      icon: Tag,
      type: "center",
    },
    {
      name: "My Orders",
      href: "/orders",
      icon: ShoppingBag,
    },
    {
      name: "Whatsapp",
      href: "https://wa.me/919509086545",
      icon: MessageCircle,
      target: "_blank",
      rel:"noopener noreferrer"
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] block md:hidden">
      <div className="relative rounded-t-3xl border-t border-gray-100 bg-white shadow-[0_-4px_25px_rgba(0,0,0,0.08)]">
        <div className="grid h-16 grid-cols-5 items-center">
          {items.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            // Center Floating "Deals" Button
            if (item.type === "center") {
              return (
                <div key={item.name} className="relative flex justify-center">
                  <Link
                    href={item.href}
                    className="absolute -top-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-blue-600 shadow-md transition-transform active:scale-95"
                  >
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    <span className="mt-0.5 text-[11px] font-medium leading-none text-white">
                      {item.name}
                    </span>
                  </Link>
                </div>
              );
            }

            // Standard Navigation Links
            return (
              <Link
                key={item.name}
                href={item.href}
                target={item.target}
      rel={item.rel}
                className="flex flex-col items-center justify-center py-1 transition-colors"
              >
                <Icon
                  className={`h-6 w-6 transition-colors ${
                    active ? "text-blue-600" : "text-gray-600"
                  }`}
                  strokeWidth={1.8}
                />
                <span
                  className={`mt-1 text-[12px] font-normal transition-colors ${
                    active ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Safe area offset for mobile web browsers */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Cookie,
  Scissors,
  Heart,
  CookingPot,
  SprayCan,
  Wheat,
  Candy,
  Sparkles,
  Flame,
  Lightbulb,
  Package,
  Pencil,
  ToyBrick,
  Baby,
  Smile,
  Shirt,
  Pill,
  PackageOpen,
  CookingPot as KitchenIcon,
} from "lucide-react";

const categories = [
  {
    name: "Snacks",
    icon: Cookie,
    color: "from-orange-500 to-amber-500",
    search: "SNACKS",
  },
  {
    name: "Hair Care",
    icon: Scissors,
    color: "from-pink-500 to-rose-500",
    search: "HAIR CARE",
  },
  {
    name: "Body Care",
    icon: Heart,
    color: "from-green-500 to-emerald-500",
    search: "BODY CARE",
  },
  {
    name: "Masalas",
    icon: CookingPot,
    color: "from-red-500 to-orange-500",
    search: "MASALAS",
  },
  {
    name: "Cleaning Items",
    icon: SprayCan,
    color: "from-cyan-500 to-blue-500",
    search: "CLEANING ITEMS",
  },
  {
    name: "Biscuits",
    icon: Cookie,
    color: "from-yellow-500 to-orange-400",
    search: "BISCUITS",
  },
  {
    name: "Face Care",
    icon: Sparkles,
    color: "from-fuchsia-500 to-pink-500",
    search: "FACE CARE",
  },
  {
    name: "Grain",
    icon: Wheat,
    color: "from-yellow-600 to-amber-600",
    search: "GRAIN",
  },
  {
    name: "Chocolate",
    icon: Candy,
    color: "from-amber-700 to-yellow-500",
    search: "CHOCOLATE",
  },
  {
    name: "Pooja Items",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    search: "POOJA ITEMS",
  },
  {
    name: "Bulbs",
    icon: Lightbulb,
    color: "from-yellow-400 to-amber-500",
    search: "bulb",
  },
  {
    name: "Detergent Bar",
    icon: Package,
    color: "from-sky-500 to-blue-500",
    search: "DETERGENT BAR",
  },
  {
    name: "Stationery",
    icon: Pencil,
    color: "from-purple-500 to-violet-500",
    search: "STATIONERY",
  },
  {
    name: "Toys",
    icon: ToyBrick,
    color: "from-indigo-500 to-purple-500",
    search: "TOYS",
  },
  {
    name: "Detergent Powder",
    icon: PackageOpen,
    color: "from-blue-600 to-cyan-500",
    search: "DETERGENT POWDER",
  },
  {
    name: "Baby Care",
    icon: Baby,
    color: "from-pink-400 to-rose-400",
    search: "BABY CARE",
  },
  {
    name: "Toothpaste",
    icon: Smile,
    color: "from-cyan-500 to-sky-500",
    search: "TOOTHPASTE",
  },
  {
    name: "Kids Toy",
    icon: ToyBrick,
    color: "from-violet-500 to-fuchsia-500",
    search: "KIDS TOY",
  },
  {
    name: "Clothing",
    icon: Shirt,
    color: "from-pink-500 to-purple-500",
    search: "CLOTHING",
  },
  {
    name: "Clothes",
    icon: Shirt,
    color: "from-rose-500 to-pink-500",
    search: "CLOTHES",
  },
  {
    name: "Tooth Paste",
    icon: Smile,
    color: "from-sky-500 to-cyan-400",
    search: "TOOTH PASTE",
  },
  {
    name: "Ditergent",
    icon: PackageOpen,
    color: "from-blue-500 to-indigo-500",
    search: "DITERGENT",
  },
  {
    name: "Cloth Gwa",
    icon: Shirt,
    color: "from-emerald-500 to-green-600",
    search: "CLOTH GWA",
  },
  {
    name: "Pads",
    icon: Pill,
    color: "from-pink-500 to-red-500",
    search: "PADS",
  },
  {
    name: "Kitchen Items",
    icon: KitchenIcon,
    color: "from-orange-500 to-yellow-500",
    search: "KITCHEN ITEMS",
  },
];

export default function Category() {

  return (
  <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">

      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Shop by Category
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our most popular product categories
        </p>
      </div>

    </div>

    {/* Category Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">

      {categories.map((category) => {

        const Icon = category.icon;

        return (

          <Link
            key={category.name}
            href={`/shop?search=${encodeURIComponent(category.search)}`}
            className="group"
          >

            <div
              className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              shadow-sm
              hover:shadow-xl
              hover:border-[#00a300]
              transition-all
              duration-300
              hover:-translate-y-1
              p-5
              flex
              flex-col
              items-center
              justify-center
              text-center
              h-[150px]
            "
            >

              {/* Icon */}
              <div
                className={`
                  w-16
                  h-16
                  rounded-full
                  bg-gradient-to-br
                  ${category.color}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  group-hover:scale-110
                  transition-transform
                  duration-300
                `}
              >

                <Icon
                  size={30}
                  className="text-white"
                  strokeWidth={2.2}
                />

              </div>

              {/* Name */}
              <h3
                className="
                mt-4
                text-sm
                font-bold
                text-gray-800
                leading-tight
                line-clamp-2
                group-hover:text-[#00a300]
                transition-colors
              "
              >
                {category.name}
              </h3>

            </div>

          </Link>

        );

      })}

    </div>

  </section>
);
 }
"use client";

import React, { useState } from "react";
import { PlusIcon } from "../shared/icons";

interface Product {
  id: string;
  category: string;
  name: string;
  weight: string;
  price: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "1",
    category: "Gift Boxes",
    name: "Artisanal Treasure Box",
    weight: "500g · Assorted 16 Pcs",
    price: "₹ 1,450",
    image: "/sites/thf/root-default/artboard/artboard1.png",
    badge: "Bestseller",
  },
  {
    id: "2",
    category: "Artisanal Baklava",
    name: "Pistachio & Hazelnut Baklava",
    weight: "400g · Crisp Phyllo & Honey",
    price: "₹ 1,200",
    image: "/sites/thf/root-default/artboard/baklavas.jpg",
    badge: "Authentic Turkish",
  },
  {
    id: "3",
    category: "Gift Boxes",
    name: "Assorted Gifting Collection",
    weight: "750g · Premium Festive Pack",
    price: "₹ 2,100",
    badge: "Luxury Gifting",
    image: "/sites/thf/root-default/artboard/assorted-gifting.jpg",
  },
  {
    id: "4",
    category: "Labon® Sweets",
    name: "Belgian Chocolate Labon®",
    weight: "350g · 12 Pcs Handcrafted",
    price: "₹ 980",
    badge: "Trademarked",
    image: "/sites/thf/root-default/artboard/artboard4.jpg",
  },
  {
    id: "5",
    category: "Fusion Mithai",
    name: "Royal Celebrations Box",
    weight: "1kg · Signature Selection",
    price: "₹ 3,450",
    badge: "Limited Edition",
    image: "/sites/thf/root-default/artboard/artboard5.png",
  },
];

export function CategoryGrid() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Labon® Sweets", "Artisanal Baklava", "Fusion Mithai", "Gift Boxes"];

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section
      id="category-grid"
      className="w-full py-16 md:py-24 bg-[#DAD7CD] relative overflow-hidden border-t border-[#A3B18A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3A5A40] mb-3">
            Handcrafted Collections
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold font-editorial text-[#344E41] mb-4"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            The Sugar House, The Way You Want It
          </h2>
          <p className="text-sm md:text-base text-[rgba(52,78,65,0.8)] max-w-xl font-medium">
            From handcrafted sweets to curated gift boxes — every piece made with intention.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8 p-1.5 rounded-full border bg-white/60 border-[#A3B18A]">
            {categories.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                  ? "bg-[#3A5A40] text-[#DAD7CD] shadow-md font-bold"
                  : "text-[#344E41] hover:bg-[#A3B18A]/30"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:border-[#3A5A40] hover:shadow-2xl bg-white"
              style={{
                borderColor: "#A3B18A",
              }}
            >
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#DAD7CD]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#344E41]/50 via-transparent to-transparent opacity-40 pointer-events-none" />

                {/* Badge Tag */}
                {product.badge && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-[#DAD7CD] bg-[#344E41] backdrop-blur-md px-3 py-1 rounded-full border border-[#588157]">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[rgba(52,78,65,0.65)] font-semibold">
                    {product.weight}
                  </span>
                  <h3 className="text-xl font-bold font-editorial text-[#344E41] mt-1 mb-2 group-hover:text-[#588157] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-[rgba(52,78,65,0.1)]">
                  <span className="text-lg font-bold text-[#3A5A40]">
                    {product.price}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 bg-[#588157] text-[#DAD7CD] hover:bg-[#3A5A40] hover:shadow-md"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

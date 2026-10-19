"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types/sewdarlin";
import { useCart } from "@/context/CartContext";

interface Props {
  slug: string;
  title: string;
  products: Product[];
  browse: { slug: string; title: string }[];
}

type Sort = "recommended" | "price-asc" | "price-desc" | "name";

const thumb =
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#34444F] [&::-webkit-slider-thumb]:cursor-pointer " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#34444F] [&::-moz-range-thumb]:cursor-pointer";

export function CategoryPage({ slug, title, products, browse }: Props) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [sort, setSort] = useState<Sort>("recommended");
  const [priceOpen, setPriceOpen] = useState(true);

  const bounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  const [range, setRange] = useState<[number, number]>([bounds.min, bounds.max]);
  const [lo, hi] = range;

  const visible = useMemo(() => {
    const list = products.filter((p) => p.price >= lo && p.price <= hi);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, lo, hi, sort]);

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="lg:w-[200px] shrink-0 font-serif text-[#4F5A5E]">
        <h2 className="text-[22px] pb-3 border-b border-[#E3DED4]">Browse by</h2>
        <ul className="mt-5 flex flex-wrap lg:flex-col gap-x-5 gap-y-2 lg:gap-y-3 text-[16px]">
          {browse.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className={`hover:text-[#D8A7A7] transition-colors ${
                  c.slug === slug ? "underline underline-offset-4 text-[#2E3A42]" : ""
                }`}
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>

        {products.length > 0 && bounds.min !== bounds.max && (
          <div className="mt-10">
            <h2 className="text-[22px] pb-3 border-b border-[#E3DED4]">Filter by</h2>
            <div className="mt-5 border-b border-[#E3DED4] pb-5">
              <button
                onClick={() => setPriceOpen(!priceOpen)}
                className="w-full flex items-center justify-between text-[16px]"
                aria-expanded={priceOpen}
              >
                <span>Price</span>
                {priceOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              {priceOpen && (
                <div className="mt-5">
                  <div className="relative h-4">
                    <div className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-[#4F5A5E]/50" />
                    <input
                      type="range"
                      min={bounds.min}
                      max={bounds.max}
                      value={lo}
                      aria-label="Minimum price"
                      onChange={(e) => setRange([Math.min(Number(e.target.value), hi), hi])}
                      className={`absolute inset-0 w-full appearance-none bg-transparent pointer-events-none ${thumb}`}
                    />
                    <input
                      type="range"
                      min={bounds.min}
                      max={bounds.max}
                      value={hi}
                      aria-label="Maximum price"
                      onChange={(e) => setRange([lo, Math.max(Number(e.target.value), lo)])}
                      className={`absolute inset-0 w-full appearance-none bg-transparent pointer-events-none ${thumb}`}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[14px]">
                    <span>A${lo}</span>
                    <span>A${hi}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* ---------------- Main ---------------- */}
      <section className="flex-1 min-w-0">
        <h1 className="font-serif text-[30px] sm:text-[34px] text-[#4F5A5E] leading-tight">{title}</h1>

        <div className="mt-8 sm:mt-12 flex items-center justify-between font-serif text-[#4F5A5E]">
          <span className="text-[14px]">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </span>
          <label className="text-[15px] flex items-center gap-1.5">
            Sort by:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent font-serif cursor-pointer focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>

        {visible.length === 0 ? (
          <div className="mt-20 mb-20 text-center font-serif text-[#4F5A5E]">
            <p className="text-[22px]">No products in this collection yet</p>
            <p className="mt-2 text-[15px] opacity-80">New pieces are on their way — check back soon.</p>
            <Link
              href="/category/all-products"
              className="inline-block mt-6 px-6 py-2 bg-[#EBC9CC] hover:bg-[#E0B8BC] text-[#4F5A5E] transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-5 gap-y-10">
            {visible.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center">
                <button
                  onClick={() => setQuickViewProduct(p)}
                  className="relative w-full aspect-square overflow-hidden bg-[#F5F2EB] block"
                  aria-label={`Quick view ${p.title}`}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                    className="object-cover object-center"
                  />
                </button>
                <h3 className="mt-4 font-serif text-[17px] text-[#4F5A5E] leading-snug px-1">{p.title}</h3>
                <p className="mt-2 font-serif text-[16px] text-[#4F5A5E]">{p.formattedPrice}</p>
                <div className="mt-auto pt-5">
                  {p.outOfStock ? (
                    <button
                      disabled
                      className="px-5 py-2.5 bg-[#9EA3A6] text-white/90 font-serif text-[16px] cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-5 py-2.5 bg-[#EBC9CC] hover:bg-[#E0B8BC] active:bg-[#D6AEB2] text-[#4F5A5E] font-serif text-[16px] transition-colors"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

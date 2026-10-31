"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/sewdarlin";
import { useCart } from "@/context/CartContext";
import { ProductReview } from "./ProductReview";

interface Props {
  slug: string;
  title: string;
  products: Product[];
  browse: { slug: string; title: string }[];
}

type Sort = "recommended" | "price-asc" | "price-desc" | "name";

export function CategoryPage({ slug, title, products, browse }: Props) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [sort, setSort] = useState<Sort>("recommended");
  const visible = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, sort]);

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
                className={`hover:text-black transition-colors ${
                  c.slug === slug ? "underline underline-offset-4 text-[#2E3A42]" : ""
                }`}
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
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
              className="inline-block mt-6 px-6 py-2 bg-black hover:bg-[#262626] text-white transition-colors"
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
                <p className="mt-2 font-serif text-[16px] text-[#DC2626]">{p.formattedPrice}</p>
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
                      className="px-5 py-2.5 bg-black hover:bg-[#262626] active:bg-[#404040] text-white font-serif text-[16px] transition-colors"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <ProductReview productId={p.id} productTitle={p.title} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

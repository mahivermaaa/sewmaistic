"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { THRIFT_STORE } from "@/data/sewdarlinData";
import { useCart } from "@/context/CartContext";

// Flat-lay positions for the collage card (percent of the card)
const SLOTS = [
  { top: "1%", left: "3%", w: "47%", rot: -4 },
  { top: "3%", left: "50%", w: "47%", rot: 3 },
  { top: "33%", left: "22%", w: "56%", rot: -2 },
  { top: "57%", left: "1%", w: "46%", rot: 3 },
  { top: "58%", left: "52%", w: "46%", rot: -3 },
];

const STRIPES = "repeating-linear-gradient(90deg, #FFFFFF 0 16px, #F0F0F0 16px 32px)";

export function ThriftStore() {
  const { setQuickViewProduct } = useCart();
  const items = THRIFT_STORE.slice(0, 5);
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section id="thrift-store" className="w-full border-t border-[#EFEBE4]">
      {/* Same width/padding as the New Arrivals section above, so the striped band lines up with it */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
       <div style={{ backgroundImage: STRIPES }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-7 sm:pb-9">
        {/* Title (links to the Thrift Store page) */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="font-serif text-[34px] sm:text-[44px] text-black leading-none tracking-tight">
            <Link href="/category/thrift-store" className="hover:text-black transition-colors">
              Thrift <span className="uppercase tracking-[0.04em]">Store</span>
            </Link>
          </h2>
          <p className="mt-2 font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#4F5A5E]">
            Pre-loved finds
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-center font-serif text-[20px] text-[#4F5A5E] py-16">
            Pre-loved finds, coming soon
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-[270px] md:max-w-none mx-auto">
            {/* Left: collage of all pieces */}
            <div className="relative bg-white shadow-sm aspect-[4/5] overflow-hidden">
              {items.map((p, i) => {
                const s = SLOTS[i % SLOTS.length];
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${p.title}`}
                    className="absolute transition-transform duration-300 hover:scale-[1.04]"
                    style={{
                      top: s.top,
                      left: s.left,
                      width: s.w,
                      transform: `rotate(${s.rot}deg) scale(${isActive ? 1.05 : 1})`,
                      zIndex: isActive ? 5 : 1,
                      filter: isActive ? "drop-shadow(0 6px 10px rgba(0,0,0,0.18))" : undefined,
                    }}
                  >
                    <span className="relative block aspect-square">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 45vw, 25vw"
                        className="object-contain mix-blend-multiply"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: selected piece with numbered tabs */}
            <div className="bg-[#E8E8E8] p-3 sm:p-4 flex gap-3 sm:gap-4 rounded-sm">
              <div className="flex-1 min-w-0 flex flex-col">
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(current)}
                  className="relative w-full aspect-[4/5] bg-white overflow-hidden"
                  aria-label={`Quick view ${current.title}`}
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 70vw, 35vw"
                    className="object-contain"
                  />
                </button>
                <div className="mt-2 text-center">
                  <h3 className="font-serif text-[16px] sm:text-[18px] text-black leading-snug">{current.title}</h3>
                  <p className="font-serif text-[16px] text-[#DC2626] mt-0.5">{current.formattedPrice}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 w-9 sm:w-10">
                {items.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Piece ${i + 1}: ${p.title}`}
                    aria-pressed={i === active}
                    className={`h-9 sm:h-10 font-sans text-[10px] sm:text-[11px] tracking-wider transition-colors ${
                      i === active
                        ? "bg-black text-white"
                        : "bg-white text-[#4F5A5E] hover:bg-[#EDEDED]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Explore more */}
        <div className="mt-5 sm:mt-7 flex justify-center">
          <Link
            href="/category/thrift-store"
            className="inline-block px-10 sm:px-14 py-3 border border-black bg-black text-white font-serif text-[15px] sm:text-[16px] tracking-[0.22em] uppercase hover:bg-[#262626] transition"
          >
            Explore more
          </Link>
        </div>
        </div>
       </div>
      </div>
    </section>
  );
}

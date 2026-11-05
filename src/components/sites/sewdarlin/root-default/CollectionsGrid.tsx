"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/sewdarlinData";
import { useCatalogue } from "@/context/CatalogueContext";
import type { CategoryInfo } from "@/lib/adminCategories";

// The 5 designed cards stay as they are. A designed card (other than Sale) disappears if its category is
// deleted in admin, and every other category added in admin gets its own "Shop <name>" card.
export function CollectionsGrid({ categories }: { categories: CategoryInfo[] }) {
  const { products } = useCatalogue();
  const linkOf = (slug: string) => `/category/${slug}`;
  const sale = COLLECTIONS.find((c) => c.id === "shop-sale");
  const designed = COLLECTIONS.filter((c) => c.id !== "shop-sale" && categories.some((k) => linkOf(k.slug) === c.link));
  const added = categories
    .filter((k) => !COLLECTIONS.some((c) => c.link === linkOf(k.slug)))
    .map((k) => ({
      id: `cat-${k.slug}`,
      title: k.title,
      buttonText: `Shop ${k.title}`,
      scriptText: "Shop",
      displayTitle: k.title,
      image: products.find((p) => p.category === k.title)?.image ?? "",
      hasOverlayText: false,
      link: linkOf(k.slug),
    }));
  const cards = [...designed, ...added, ...(sale ? [sale] : [])];

  return (
    <section id="collections" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Centered Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[46px] text-[#4F5A5E] tracking-tight">
          Shop By Collection
        </h2>
      </div>

      {/* 5 Collection Cards Grid */}
      <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
        {cards.map((col) => (
          <div
            key={col.id}
            className="flex flex-col items-center group w-[calc(50%-10px)] max-sm:[&:last-child:nth-child(odd)]:w-full sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]"
          >
            {/* Card Image Box */}
            <Link
              href={col.link}
              className="relative w-full aspect-square max-w-[260px] bg-white rounded-xs overflow-hidden shadow-2xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 border border-[#ECE7DE] flex items-center justify-center"
            >
              {col.image ? (
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-[#EFEAE0]" />
              )}

              {/* Text overlay for items that don't have text printed inside the asset */}
              {!col.hasOverlayText && (
                <div className="absolute inset-0 bg-white/25 group-hover:bg-white/15 transition-colors flex flex-col items-center justify-center text-center p-3 z-10">
                  {col.scriptText && (
                    <span className="font-serif italic text-[34px] sm:text-[40px] font-normal text-[#3A4A54] leading-none select-none">
                      {col.scriptText}
                    </span>
                  )}
                  <span className="font-serif text-[24px] sm:text-[28px] text-[#2E3A42] leading-tight font-bold mt-0.5 select-none">
                    {col.displayTitle || col.title}
                  </span>
                </div>
              )}
            </Link>

            {/* Pill Action Button */}
            <div className="mt-3.5 w-full flex justify-center">
              <Link
                href={col.link}
                className="inline-block px-5 sm:px-6 py-2 rounded-full bg-black hover:bg-[#262626] active:bg-[#404040] text-white font-serif text-[14px] sm:text-[15px] transition-all duration-200 text-center shadow-2xs hover:shadow-xs active:scale-95 whitespace-nowrap"
              >
                {col.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

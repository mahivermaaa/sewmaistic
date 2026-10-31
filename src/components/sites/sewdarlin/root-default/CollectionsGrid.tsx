"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/sewdarlinData";

export function CollectionsGrid() {
  return (
    <section id="collections" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Centered Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[46px] text-[#4F5A5E] tracking-tight">
          Shop By Collection
        </h2>
      </div>

      {/* 5 Collection Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 justify-center">
        {COLLECTIONS.map((col, index) => (
          <div
            key={col.id}
            className={`flex flex-col items-center group ${
              index === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            {/* Card Image Box */}
            <Link
              href={col.link}
              className="relative w-full aspect-square max-w-[260px] bg-white rounded-xs overflow-hidden shadow-2xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 border border-[#ECE7DE] flex items-center justify-center"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

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

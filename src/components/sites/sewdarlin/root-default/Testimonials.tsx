"use client";

import React from "react";
import { REVIEWS } from "@/data/sewdarlinData";

export function Testimonials() {
  return (
    <section className="w-full text-[#34444F]">
      {/* Same width/padding as the sections above so the pink band lines up */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
       <div className="bg-black rounded-[28px] sm:rounded-[36px] pt-7 sm:pt-9 pb-9 sm:pb-16 px-4 sm:px-8">
      {/* Heading */}
      <div className="text-center mb-9 sm:mb-16 flex items-end justify-center gap-1 sm:gap-2">
        <span className="font-sans font-semibold text-[28px] sm:text-[52px] text-white leading-none tracking-tight">
          feedback
        </span>
        <span
          style={{ fontFamily: "var(--font-script), cursive" }}
          className="text-[36px] sm:text-[72px] text-[#FBEFEA] leading-none -mb-1"
        >
          diaries
        </span>
      </div>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {REVIEWS.map((review) => (
          <div key={review.id} className="relative bg-white rounded-[24px] sm:rounded-[28px] w-full max-w-[250px] sm:max-w-none mx-auto pt-9 pb-7 px-4 sm:pt-12 sm:pb-10 sm:px-7 text-center shadow-sm">
            {/* Big quote marks */}
            <span aria-hidden className="absolute -top-2 left-3 font-serif font-bold text-[60px] sm:text-[84px] leading-none text-black select-none">“</span>
            <span aria-hidden className="absolute -bottom-9 right-3 font-serif font-bold text-[60px] sm:text-[84px] leading-none text-black select-none">”</span>

            {/* Avatar */}
            <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white bg-black flex items-center justify-center font-serif text-[26px] text-white shadow-sm">
              {review.author.replace(/^D\.\s*/, "").charAt(0)}
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1.5 text-black text-[15px] sm:text-[20px] leading-none mb-3 sm:mb-4" aria-label="5 out of 5 stars">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>

            {/* Review text */}
            <p className="font-sans text-[11.5px] sm:text-[14px] leading-relaxed text-[#2E3A42] max-w-[320px] mx-auto">
              {review.quote}
            </p>

            {/* Author */}
            <p className="mt-4 sm:mt-5 font-serif text-[14px] sm:text-[18px] font-semibold text-[#2E3A42] tracking-wide">
              — {review.author}
            </p>
          </div>
        ))}
      </div>
       </div>
      </div>
    </section>
  );
}

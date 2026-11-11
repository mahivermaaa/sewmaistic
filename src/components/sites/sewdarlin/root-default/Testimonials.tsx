"use client";

import React from "react";
import type { Review } from "@/types/sewdarlin";

// Card shape: big rounded corners, extra-round bottom-left, with a black shape peeking out behind it.
const SHAPE = "rounded-[32px] rounded-bl-[64px] rounded-br-[28px]";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  return (
    <section className="w-full text-[#34444F]">
      {/* Same width/padding as the sections above */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Heading */}
        <div className="text-center mb-4 sm:mb-10 flex items-end justify-center gap-1 sm:gap-2">
          <span className="font-sans font-semibold text-[28px] sm:text-[52px] text-black leading-none tracking-tight">
            feedback
          </span>
          <span
            style={{ fontFamily: "var(--font-script), cursive" }}
            className="text-[36px] sm:text-[72px] text-black leading-none -mb-1"
          >
            diaries
          </span>
        </div>

        {/* Phone: swipe sideways. Desktop: 3 across. */}
        <div className="no-scrollbar max-w-[1240px] mx-auto flex md:grid md:grid-cols-3 gap-7 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-12 pb-6 px-3 md:px-3">
          {reviews.map((review) => (
            <div key={review.id} className="relative shrink-0 w-[78%] sm:w-[55%] md:w-auto snap-center">
              {/* Black shape behind the card */}
              <span aria-hidden className={`absolute inset-0 translate-x-2 -translate-y-2 bg-black ${SHAPE}`} />

              <div className={`relative bg-white ${SHAPE} px-5 pt-11 pb-9 text-center shadow-sm`}>
                {/* Avatar */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white bg-black flex items-center justify-center font-serif text-[26px] text-white shadow-sm">
                  {review.author.replace(/^D\.\s*/, "").charAt(0)}
                </div>

                <p className="font-sans text-[17px] sm:text-[19px] font-medium text-black">{review.author}</p>

                <div className="flex justify-center gap-1 text-black text-[13px] leading-none mt-1.5" aria-label="5 out of 5 stars">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>

                <span aria-hidden className="block font-serif font-bold text-[46px] leading-[0.8] text-black mt-3 select-none">“</span>

                <p className="font-sans italic text-[13px] sm:text-[14px] leading-relaxed text-[#4F5A5E] mt-1">
                  {review.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

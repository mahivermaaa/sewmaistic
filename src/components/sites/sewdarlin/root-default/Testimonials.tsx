"use client";

import React from "react";
import { REVIEWS } from "@/data/sewdarlinData";

export function Testimonials() {
  return (
    <section className="w-full bg-[#D5B3B3] text-[#34444F] py-16 sm:py-20 px-4 sm:px-8 border-y border-[#C5A3A3]">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Double quote mark */}
            <div className="text-[52px] leading-none font-serif text-[#4F5A5E] select-none mb-2">
              “
            </div>

            {/* Author Name */}
            <h3 className="font-serif text-[24px] sm:text-[26px] text-[#2E3A42] mb-4 tracking-wide">
              {review.author}
            </h3>

            {/* Review text */}
            <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#384347] max-w-[340px]">
              {review.quote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

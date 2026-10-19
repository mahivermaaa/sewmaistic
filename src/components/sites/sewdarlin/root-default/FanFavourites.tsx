"use client";

import React from "react";
import { FAN_FAVOURITES } from "@/data/sewdarlinData";
import { ProductCarousel } from "./ProductCarousel";

export function FanFavourites() {
  return (
    <section id="fan-favourites" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 border-t border-[#EFEBE4]">
      {/* Section Title */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] text-[#4F5A5E] tracking-tight">
          Fan Favourites
        </h2>
      </div>

      {/* Product Carousel */}
      <ProductCarousel products={FAN_FAVOURITES} />
    </section>
  );
}

"use client";

import React from "react";
import { NEW_ARRIVALS } from "@/data/sewdarlinData";
import { ProductCarousel } from "./ProductCarousel";

export function NewArrivals() {
  return (
    <section id="new-arrivals" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-14">
      {/* Section Title */}
      <div className="mb-4 sm:mb-8">
        <h2 className="font-serif text-[28px] sm:text-[40px] md:text-[44px] text-[#4F5A5E] tracking-tight">
          New Arrivals
        </h2>
      </div>

      {/* Product Carousel */}
      <ProductCarousel products={NEW_ARRIVALS} />
    </section>
  );
}

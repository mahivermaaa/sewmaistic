"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/sewdarlin";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -520 : 520;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Left Scroll Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#4F5A5E] shadow-md border border-[#E5DFD5] flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
      )}

      {/* Right Scroll Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#4F5A5E] shadow-md border border-[#E5DFD5] flex items-center justify-center transition-all duration-200 hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

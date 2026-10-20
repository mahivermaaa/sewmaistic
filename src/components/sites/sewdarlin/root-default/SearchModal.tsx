"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, X, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/sewdarlinData";
import { useCart } from "@/context/CartContext";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  const results = query.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FBF9F4] rounded-2xl shadow-2xl border border-[#E5DFD5] overflow-hidden z-10 animate-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EBE6DD] flex items-center bg-white space-x-3">
          <Search className="w-5 h-5 text-[#7A878B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scrunchies, bows, Kindle cases, bags..."
            className="flex-1 bg-transparent text-[#2E3A42] text-[16px] outline-hidden placeholder-[#9EA8AC] font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#7A878B] hover:text-black font-sans px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#4F5A5E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-sans uppercase tracking-wider text-[#9EA8AC] mb-3">
            {query.trim() ? `Found ${results.length} results` : "Suggested for You"}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-[#7A878B]">
              <p className="font-serif text-[18px] text-[#4F5A5E]">No products found</p>
              <p className="text-xs mt-1">Try searching for &quot;Kindle&quot;, &quot;tote&quot;, &quot;bow&quot;, or &quot;scrunchie&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-2.5 rounded-xl bg-white border border-[#EBE6DD] hover:border-[#E8B7AF] transition-colors group cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setQuickViewProduct(product);
                  }}
                >
                  <div className="relative w-14 h-14 bg-[#F5F2EB] rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-[13px] text-[#2E3A42] font-medium leading-snug line-clamp-1 group-hover:text-[#E8B7AF] transition-colors">
                      {product.title}
                    </h4>
                    <span className="text-xs text-[#4F5A5E] font-medium">
                      {product.formattedPrice}
                    </span>
                  </div>
                  {!product.outOfStock && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        handleClose();
                      }}
                      className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#E8B7AF] hover:text-white text-[#4F5A5E] transition-colors shadow-2xs"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

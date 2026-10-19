"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FBF9F4] rounded-2xl shadow-2xl border border-[#E5DFD5] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4F5A5E] hover:text-[#2E3A42] transition-colors shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Container */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-[#F5F2EB] border-b md:border-b-0 md:border-r border-[#EBE6DD]">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              fill
              className="object-cover"
            />
            {quickViewProduct.outOfStock && (
              <div className="absolute top-4 left-4 bg-[#667073] text-white text-xs font-sans px-3 py-1 rounded-sm uppercase tracking-wider">
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9EA8AC] font-sans font-medium">
                {quickViewProduct.category}
              </span>
              <h2 className="font-serif text-[24px] sm:text-[28px] text-[#2E3A42] leading-tight mt-1 mb-2">
                {quickViewProduct.title}
              </h2>
              <div className="text-[20px] font-sans text-[#4F5A5E] font-medium mb-4">
                {quickViewProduct.formattedPrice}
              </div>

              <p className="text-[14px] text-[#556368] leading-relaxed mb-6 font-sans">
                {quickViewProduct.description ||
                  "Handcrafted with exquisite cottage charm in Queensland, Australia. Perfect for gifting or treating yourself."}
              </p>

              <div className="flex items-center space-x-2 text-xs text-[#6F7D82] mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Small batch handmade in QLD Australia</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="pt-4 border-t border-[#EBE6DD]">
              {quickViewProduct.outOfStock ? (
                <div className="w-full py-3 bg-[#E8E3DB] text-[#8C989C] rounded-full text-center text-sm font-sans">
                  Currently Sold Out
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Qty pill */}
                  <div className="flex items-center border border-[#D5CEC2] rounded-full px-3 py-1.5 bg-white">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1 hover:text-black transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-[#4F5A5E]" />
                    </button>
                    <span className="mx-3 text-sm font-mono text-[#2E3A42]">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-1 hover:text-black transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#4F5A5E]" />
                    </button>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#D8A7A7] hover:bg-[#C89696] active:bg-[#B88585] text-[#34444F] font-sans py-2.5 px-6 rounded-full text-[14px] font-medium transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-98 flex items-center justify-center space-x-2"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <span>Add to Cart • ${(quickViewProduct.price * qty).toFixed(2)}</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

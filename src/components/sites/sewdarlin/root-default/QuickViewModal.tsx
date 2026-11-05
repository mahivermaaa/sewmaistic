"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Start on the first photo whenever a different product is opened
  const productId = quickViewProduct?.id;
  useEffect(() => {
    setImgIdx(0);
  }, [productId]);

  if (!quickViewProduct) return null;

  const gallery =
    quickViewProduct.images && quickViewProduct.images.length > 1
      ? quickViewProduct.images
      : [quickViewProduct.image];
  const hasMany = gallery.length > 1;
  const shown = gallery[Math.min(imgIdx, gallery.length - 1)];
  const go = (dir: number) => setImgIdx((i) => (i + dir + gallery.length) % gallery.length);

  // Swipe left/right on touch screens
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMany) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

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
          <div
            className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-[#F5F2EB] border-b md:border-b-0 md:border-r border-[#EBE6DD] touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              key={shown}
              src={shown}
              alt={quickViewProduct.title}
              fill
              className="object-cover animate-in fade-in duration-200"
            />

            {hasMany && (
              <>
                {/* Arrows (desktop) */}
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/85 hover:bg-white text-black shadow-sm transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/85 hover:bg-white text-black shadow-sm transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots (all screens) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImgIdx(i)}
                      className={`h-2 rounded-full transition-all ${i === imgIdx ? "w-5 bg-black" : "w-2 bg-black/30"}`}
                      aria-label={`Show photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
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
              <div className="text-[20px] font-sans text-[#DC2626] font-medium mb-4">
                {quickViewProduct.formattedPrice}
              </div>

              <p className="text-[14px] text-[#556368] leading-relaxed mb-6 font-sans">
                {quickViewProduct.description ||
                  "Handcrafted with exquisite cottage charm in Delhi, India. Perfect for gifting or treating yourself."}
              </p>

              <div className="flex items-center space-x-2 text-xs text-[#6F7D82] mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Small batch handmade in Delhi, India</span>
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
                    className="flex-1 bg-black hover:bg-[#262626] active:bg-[#404040] text-white font-sans py-2.5 px-6 rounded-full text-[14px] font-medium transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-98 flex items-center justify-center space-x-2"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <span>Add to Cart • ₹{(quickViewProduct.price * qty).toLocaleString("en-IN")}</span>
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

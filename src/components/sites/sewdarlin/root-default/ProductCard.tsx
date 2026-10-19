"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/sewdarlin";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart();

  return (
    <div className="group flex flex-col items-center w-[230px] sm:w-[250px] shrink-0 text-center select-none">
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-[#F5F2EB] rounded-sm overflow-hidden mb-3 border border-[#ECE7DE] cursor-pointer">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 230px, 250px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onClick={() => setQuickViewProduct(product)}
        />

        {/* Out of Stock overlay ribbon */}
        {product.outOfStock && (
          <div className="absolute top-2 left-2 bg-[#667073]/90 text-white text-[11px] font-sans px-2.5 py-1 rounded-sm tracking-wider uppercase">
            Out of Stock
          </div>
        )}

        {/* Quick View Button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute inset-x-0 bottom-0 py-2.5 bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#4F5A5E] text-[13px] font-sans tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs flex items-center justify-center border-t border-[#E5DFD5]"
        >
          Quick View
        </button>
      </div>

      {/* Product Title */}
      <h3
        onClick={() => setQuickViewProduct(product)}
        className="font-sans text-[14px] sm:text-[15px] text-[#4F5A5E] hover:text-[#2E3A42] font-normal leading-snug line-clamp-2 min-h-[42px] cursor-pointer px-1 mb-1"
      >
        {product.title}
      </h3>

      {/* Product Price */}
      <p className="text-[14px] sm:text-[15px] font-sans text-[#4F5A5E] mb-3">
        {product.formattedPrice}
      </p>

      {/* Action Button */}
      {product.outOfStock ? (
        <button
          disabled
          className="w-auto px-6 py-2 rounded-full bg-[#E8E3DB] text-[#8C989C] text-[13px] sm:text-[14px] font-sans cursor-not-allowed"
        >
          Out of Stock
        </button>
      ) : (
        <button
          onClick={() => addToCart(product, 1)}
          className="w-auto px-6 py-2 rounded-full bg-[#D8A7A7] hover:bg-[#C89696] active:bg-[#B88585] text-[#34444F] font-sans text-[13px] sm:text-[14px] transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

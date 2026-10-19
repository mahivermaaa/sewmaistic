"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { THRIFT_STORE } from "@/data/sewdarlinData";
import { ProductCarousel } from "./ProductCarousel";

export function ThriftStore() {
  return (
    <section id="thrift-store" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 border-t border-[#EFEBE4]">
      {/* Section Title */}
      <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] text-[#4F5A5E] tracking-tight">
          Thrift Store
        </h2>
        <Link
          href="/category/thrift-store"
          className="font-serif text-[15px] sm:text-[17px] text-[#4F5A5E] hover:text-[#D8A7A7] underline underline-offset-4 whitespace-nowrap pb-1.5 transition-colors"
        >
          View all
        </Link>
      </div>

      {THRIFT_STORE.length > 0 ? (
        <ProductCarousel products={THRIFT_STORE} />
      ) : (
        /* Shown until thrift products are added to THRIFT_STORE in sewdarlinData.ts */
        <Link
          href="/category/thrift-store"
          className="group flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-white border border-[#ECE7DE] p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          <div className="relative w-full sm:w-[280px] aspect-square shrink-0 overflow-hidden">
            <Image
              src="/sites/sewdarlin/root-default/col-thrift.jpg"
              alt="Thrift Store"
              fill
              sizes="(max-width: 640px) 100vw, 280px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-serif text-[24px] sm:text-[28px] text-[#4F5A5E]">Pre-loved finds, coming soon</p>
            <p className="mt-2 font-serif text-[16px] text-[#4F5A5E]/80">
              Our thrifted treasures are being sorted. Have a peek at the Thrift Store.
            </p>
            <span className="inline-block mt-5 px-6 py-2 rounded-full bg-[#D8A7A7] group-hover:bg-[#C89696] text-[#34444F] font-serif text-[15px] transition-colors">
              Shop Thrift Store
            </span>
          </div>
        </Link>
      )}
    </section>
  );
}

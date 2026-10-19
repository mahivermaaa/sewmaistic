"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#F9E7E0] overflow-hidden">
      {/* ========================================================= */}
      {/* MOBILE HERO BANNER (Screens < md)                          */}
      {/* 2 rows of polaroids: 3 on top, 2 below, text at bottom    */}
      {/* Exactly matches user's mobile screenshot                   */}
      {/* ========================================================= */}
      <div className="md:hidden relative w-full aspect-[750/734] max-w-[640px] mx-auto">
        <Image
          src="/sites/sewdarlin/root-default/hero-banner-mobile.jpg"
          alt="Handcrafted Country & Cottage Inspired Accessories - Sewmaistic"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ========================================================= */}
      {/* DESKTOP HERO BANNER (Screens >= md)                       */}
      {/* 1 row of 6 polaroids with Shop Collection CTA button       */}
      {/* ========================================================= */}
      <div className="hidden md:block relative w-full max-w-[1920px] mx-auto">
        <div className="relative w-full aspect-[1440/589] min-h-[480px] lg:min-h-[560px]">
          <Image
            src="/sites/sewdarlin/root-default/hero-banner.png"
            alt="Handcrafted Country & Cottage Inspired Accessories - Sewmaistic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Centered CTA button placed in lower hero area on desktop */}
          <div className="absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-10 w-auto">
            <Link
              href="#collections"
              className="group inline-flex items-center space-x-2.5 bg-white/95 hover:bg-white text-[#4F5A5E] hover:text-[#2E3A42] border border-[#7A878B]/50 hover:border-[#4F5A5E] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-serif tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md backdrop-blur-xs"
            >
              <span>SHOP THE COLLECTION</span>
              <span className="text-base group-hover:translate-x-1 transition-transform duration-300">⟶</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <div className="md:hidden w-full bg-[#FCFCFC]">
        <Link
          href="#collections"
          aria-label="Shop the collection"
          className="relative block w-full aspect-[1587/2245] max-w-[640px] mx-auto"
        >
          <Image
            src="/sites/sewdarlin/root-default/hero-banner-mobile-grid.jpg"
            alt="Sewmaistic - quirky, handmade and full of personality. Shop now"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Link>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP HERO BANNER (Screens >= md)                       */}
      {/* ========================================================= */}
      <div className="hidden md:block w-full bg-[#FCFCFC]">
        <Link
          href="#collections"
          aria-label="Shop the collection"
          className="relative block w-full aspect-[2245/1587] max-h-[calc(100vh-160px)]"
        >
          <Image
            src="/sites/sewdarlin/root-default/hero-banner-pc-grid.png"
            alt="Sewmaistic - quirky, handmade and full of personality. Shop now"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Link>
      </div>
    </section>
  );
}

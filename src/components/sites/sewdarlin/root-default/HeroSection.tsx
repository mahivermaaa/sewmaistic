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
      <div className="md:hidden w-full bg-[#F6F4C1]">
        <Link
          href="#collections"
          aria-label="Shop the collection"
          className="relative block w-full aspect-[736/981] max-w-[640px] mx-auto"
        >
          <Image
            src="/sites/sewdarlin/root-default/hero-banner-mobile-pouch.jpg"
            alt="The Pouch Bag - puffy, pretty, perfect - Sewmaistic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Link>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP HERO BANNER (Screens >= md) - "The Pouch Bag"      */}
      {/* ========================================================= */}
      <div className="hidden md:block w-full bg-[#F6F4C1]">
        <Link
          href="#collections"
          aria-label="Shop the collection"
          className="relative block w-full max-w-[1920px] mx-auto aspect-[2/1] max-h-[calc(100vh-160px)] min-h-[420px]"
        >
          <Image
            src="/sites/sewdarlin/root-default/hero-banner-pc.jpg"
            alt="The Pouch Bag - puffy, pretty, perfect - Sewmaistic"
            fill
            priority
            sizes="100vw"
            className="object-contain object-center"
          />
        </Link>
      </div>
    </section>
  );
}

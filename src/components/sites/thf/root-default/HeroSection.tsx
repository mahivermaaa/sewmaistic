"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../shared/icons";

export function HeroSection() {
  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-[#DAD7CD]">
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, #588157 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Main Headline */}
        <h1
          className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6 text-[#344E41]"
          style={{ fontFamily: "var(--font-bodoni), serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A5A40] via-[#588157] to-[#344E41]">
            Because classics deserve a comeback.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl max-w-2xl text-[rgba(52,78,65,0.85)] leading-relaxed mb-8 font-medium">
          Fusion artisanal confections, crafted in small batches. Packaged with intention.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Link
            href="#category-grid"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-lg group hover:scale-[1.03] text-[#DAD7CD]"
            style={{
              background: "#588157",
              boxShadow: "0 6px 24px rgba(88, 129, 87, 0.35)",
            }}
          >
            Explore Collection
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="#build-byob"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:bg-[rgba(58,90,64,0.1)] text-[#344E41]"
            style={{
              border: "1.5px solid #3A5A40",
            }}
          >
            Build Your Box
          </Link>
        </div>

        {/* Hero Imagery Card */}
        <div
          className="w-full max-w-5xl rounded-3xl overflow-hidden border shadow-2xl relative group bg-[#ffffff]"
          style={{
            borderColor: "#A3B18A",
          }}
        >
          <img
            src="/sites/thf/root-default/artboard/artboard1.png"
            alt="The Sugar House Artisanal Box"
            className="w-full h-auto object-cover max-h-[520px] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#344E41]/80 via-transparent to-transparent opacity-80 pointer-events-none" />

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left max-w-md">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#DAD7CD] bg-[#344E41] px-3.5 py-1.5 rounded-full border border-[#588157]">
              Signature Collection
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-editorial text-[#DAD7CD] mt-2">
              Artisanal Treasure Box
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

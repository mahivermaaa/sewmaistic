"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../shared/icons";

export function LabonSpotlight() {
  return (
    <section
      id="labon-spotlight"
      className="w-full py-16 md:py-24 bg-[#DAD7CD] relative overflow-hidden border-t border-[#A3B18A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column Text */}
        <div className="flex flex-col items-start text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#DAD7CD] bg-[#3A5A40] px-3.5 py-1.5 rounded-full border border-[#588157] mb-6">
            ® REGISTERED TRADEMARK
          </span>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#344E41] leading-tight mb-6"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Introducing the Labon®
          </h2>

          <p className="text-base md:text-lg text-[rgba(52,78,65,0.85)] leading-relaxed mb-6 font-medium">
            We took everything you love about an Indian laddoo — the warmth, the richness, the nostalgia — and wrapped it with fine Belgian chocolate, slow-roasted nuts, and delicate aromatic spices.
          </p>

          <ul className="space-y-3.5 mb-8 text-sm md:text-base text-[#344E41] font-semibold">
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#588157]" />
              <span>100% Pure Ghee & Natural Ingredients</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#588157]" />
              <span>No Added Artificial Preservatives</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#588157]" />
              <span>Signature Gift Box Packaging</span>
            </li>
          </ul>

          <Link
            href="#category-grid"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 bg-[#588157] text-[#DAD7CD] hover:bg-[#3A5A40]"
          >
            Explore Labon® Flavors
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Column Image Composition */}
        <div className="relative rounded-3xl overflow-hidden border border-[#A3B18A] shadow-2xl bg-white group">
          <img
            src="/sites/thf/root-default/artboard/artboard4.jpg"
            alt="Introducing the Labon"
            className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#344E41]/70 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="absolute bottom-6 right-6 bg-[#344E41] backdrop-blur-md px-4 py-2 rounded-xl border border-[#588157]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DAD7CD]">
              The Sugar House Original Recipe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

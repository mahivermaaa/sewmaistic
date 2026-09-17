"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../shared/icons";

export function BuildBoxBanner() {
  return (
    <section
      id="build-byob"
      className="w-full py-12 md:py-16 bg-[#DAD7CD] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="thf-cta-banner rounded-3xl p-8 md:p-12 border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          style={{
            background: "#344E41",
            borderColor: "#3A5A40",
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
            style={{ background: "#588157" }}
          />

          <div className="max-w-2xl relative z-10 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DAD7CD] bg-[#588157] px-3.5 py-1.5 rounded-full border border-[#A3B18A] inline-block mb-4">
              Custom Gifting Experience
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#DAD7CD] leading-tight mb-3"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Can&apos;t decide? Build exactly the box you want.
            </h2>
            <p className="text-sm md:text-base text-[rgba(218,215,205,0.85)] leading-relaxed font-medium">
              Choose your vessel, pick your favorite handcrafted sweets, add a custom ribbon, and include a personalized gift message.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="#footer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-xl group hover:scale-[1.04] text-[#DAD7CD]"
              style={{
                background: "#588157",
                boxShadow: "0 8px 30px rgba(58, 90, 64, 0.4)",
              }}
            >
              Start Building
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { PhoneIcon } from "../shared/icons";

export function FloatingCallButton() {
  return (
    <a
      href="tel:+917000000000"
      aria-label="Call Us"
      className="fixed bottom-14 left-3 sm:bottom-6 sm:left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full animate-call-wobble transition-transform hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #588157 0%, #3A5A40 100%)",
        boxShadow: "0 6px 28px rgba(58, 90, 64, 0.55)",
        border: "2px solid #A3B18A",
      }}
    >
      <PhoneIcon className="w-5 h-5 text-[#DAD7CD] fill-[#DAD7CD]" />
    </a>
  );
}

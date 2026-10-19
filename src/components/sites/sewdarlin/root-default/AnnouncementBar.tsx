"use client";

import React from "react";

export function AnnouncementBar() {
  return (
    <div className="hidden md:block w-full bg-[#B0C2D1] text-[#34444F] py-2 px-4 overflow-hidden border-b border-[#9EB3C4]/40 select-none z-30">
      <div className="flex items-center justify-center space-x-6 text-[14px] md:text-[15px] font-serif tracking-wide text-center">
        <span>Spend $80+ for FREE Shipping Australia-Wide!</span>
        <span className="text-xs opacity-75">✦</span>
        <span>Spend $80+ for FREE Shipping Australia-Wide!</span>
        <span className="text-xs opacity-75">✦</span>
        <span>Spend $80+ for FREE Shipping Australia-Wide!</span>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export function TickerBanner() {
  const tickerItems = [
    "ARTISANAL SWEETS",
    "PAN-INDIA DELIVERY",
    "HANDCRAFTED BAKLAVA",
    "LUXURY GIFT BOXES",
    "FRESH BATCHES DAILY",
    "PREMIUM BELGIAN CHOCOLATE",
  ];

  return (
    <div
      className="w-full overflow-hidden py-2.5 border-y relative z-10"
      style={{
        background: "#3A5A40",
        borderColor: "rgba(163, 177, 138, 0.3)",
      }}
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#DAD7CD]">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
          (text, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="hover:text-[#A3B18A] transition-colors cursor-default">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] inline-block opacity-80" />
            </div>
          )
        )}
      </div>
    </div>
  );
}

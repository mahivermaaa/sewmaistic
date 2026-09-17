"use client";

import React from "react";

interface PressQuote {
  publication: string;
  quote: string;
  logo: string;
}

const pressQuotes: PressQuote[] = [
  {
    publication: "VOGUE",
    quote: "The Sugar House has elevated traditional Indian sweets into an art form of luxury gifting.",
    logo: "/sites/thf/root-default/new-press/press-1.png",
  },
  {
    publication: "FORBES",
    quote: "Combining rich heritage recipes with modern culinary precision and sustainable packaging.",
    logo: "/sites/thf/root-default/new-press/press-2.png",
  },
  {
    publication: "THE ECONOMIC TIMES",
    quote: "A pioneering food brand setting new benchmarks in artisanal confectioneries.",
    logo: "/sites/thf/root-default/new-press/press-3.png",
  },
  {
    publication: "GQ INDIA",
    quote: "Masterful presentation, exquisite Belgian chocolate, and uncompromised taste in every bite.",
    logo: "/sites/thf/root-default/new-press/press-4.jpeg",
  },
];

export function PressCoverage() {
  return (
    <section
      id="press-coverage"
      className="w-full py-16 md:py-24 bg-[#DAD7CD] relative overflow-hidden border-t border-[#A3B18A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3A5A40] mb-3">
            Media Coverage
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold font-editorial text-[#344E41] mb-4"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Not To Brag, But The Press Agrees
          </h2>
          <p className="text-sm md:text-base text-[rgba(52,78,65,0.8)] max-w-xl font-medium">
            Featured across leading publications for the craft, care, and consistency behind every box we send out.
          </p>
        </div>

        {/* Press Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pressQuotes.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 hover:border-[#3A5A40] bg-white shadow-sm hover:shadow-md"
              style={{
                borderColor: "#A3B18A",
              }}
            >
              <p className="text-base md:text-lg italic text-[#344E41] leading-relaxed mb-6 font-serif">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(52,78,65,0.1)]">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#588157]">
                  {item.publication}
                </span>

                <img
                  src={item.logo}
                  alt={item.publication}
                  className="h-6 md:h-8 w-auto object-contain opacity-80 filter brightness-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

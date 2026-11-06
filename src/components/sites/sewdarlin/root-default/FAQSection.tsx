"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";

const FAQS = [
  {
    q: "What is your brand about?",
    a: "Sewmaistic is an independent creative brand offering handmade fashion, accessories, cosplay creations and thrifted finds.",
  },
  {
    q: "Are all products handmade?",
    a: "Most products are handmade by us, except for items in our thrift collection.",
  },
  {
    q: "Do you accept custom orders?",
    a: "Yes! For custom orders, DM us on Instagram @sewmaistic.",
  },
  {
    q: "How can I place an order?",
    a: "You can place your order directly through our website.",
  },
  {
    q: "Can I customise the size, colour or design of a bag?",
    a: "Yes! Customisation is available. DM us on Instagram to discuss your ideas.",
  },
  {
    q: "Can I request a bag based on a reference?",
    a: "Absolutely! Share your references with us on Instagram.",
  },
  {
    q: "Can I request additional pockets or matching charms?",
    a: "Yes! Additional pockets, compartments and matching accessories are available upon request.",
  },
  {
    q: "Can I send a character reference for cosplay?",
    a: "Of course! Share your character references and we'll discuss your requirements.",
  },
  {
    q: "How long does a custom costume take?",
    a: "It depends on the complexity of the design and material selection.",
  },
  {
    q: "Is advance payment required?",
    a: "Yes, an advance payment is required to confirm your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI payments and payments through cards.",
  },
  {
    q: "Do you ship across India or internationally?",
    a: "We ship throughout India. Currently, we do not offer international shipping.",
  },
  {
    q: "Do you accept returns or exchanges?",
    a: "No, we currently do not offer returns or exchanges. Please review your order carefully before purchasing.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full text-[#34444F]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Eyebrow + heading, same pattern as the Thrift Store section */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block rounded-full border border-[#E5DFD5] px-3.5 py-1 font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#4F5A5E] mb-3">
            FAQs
          </span>
          <h2 className="font-serif text-[34px] sm:text-[44px] text-[#34444F] leading-none tracking-tight">
            Common Questions
          </h2>
        </div>

        {/* Accordion list */}
        <div className="max-w-[760px] mx-auto flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border bg-[#FBF9F4] border-[#ECE7DE]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 text-left"
                >
                  <span className="shrink-0 w-6 font-sans text-[12px] text-black">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-serif font-semibold text-[15px] sm:text-[17px] text-[#2E3A42] leading-snug">
                    {item.q}
                  </span>
                  <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center">
                    {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Smooth expand/collapse without measuring height in JS */}
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden bg-[#FFFDFB] rounded-b-2xl">
                    <p className="pl-9 sm:pl-10 pr-10 sm:pr-14 pb-4 sm:pb-5 font-serif text-[16px] sm:text-[17px] leading-relaxed text-[#4F5A5E]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="text-center mt-8 sm:mt-10 font-sans text-[13px] sm:text-[14px] text-[#4F5A5E]">
          Have any other questions?{" "}
          <Link
            href="https://www.instagram.com/sewmaistic/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E3A42] underline underline-offset-4 hover:text-black transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

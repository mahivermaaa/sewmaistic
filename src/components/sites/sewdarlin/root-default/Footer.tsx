"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const links = [
    { label: "Meet The Maker", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#667073] text-white py-12 px-4 sm:px-8">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        {/* Policy Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10 text-center">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] sm:text-[15px] font-sans text-white/95 hover:text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom row with copyright and language selector */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/20 gap-4 text-center sm:text-left">
          <p className="text-[13px] text-white/80 font-sans">
            © 2026 Sewmaistic
          </p>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-white/40 hover:border-white/80 rounded-md px-3.5 py-1.5 text-[13px] flex items-center space-x-2 bg-transparent text-white transition-colors"
            >
              <span>{selectedLang}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {langOpen && (
              <div className="absolute right-0 bottom-full mb-2 bg-[#525B5E] text-white rounded-md shadow-lg py-1 border border-white/20 min-w-[120px] text-left z-20">
                {["English", "Français", "Deutsch", "Italiano", "日本語"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-[13px] text-left hover:bg-white/15 transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

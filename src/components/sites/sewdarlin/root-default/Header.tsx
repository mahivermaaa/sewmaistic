"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Bags", href: "/category/bags" },
  { label: "Cosplay Costumes", href: "/category/cosplay-costumes" },
  { label: "Thrift Store", href: "/category/thrift-store" },
  { label: "Little Somethings", href: "/category/little-somethings" },
  { label: "Sale", href: "/category/sale" },
];

// Scrolling announcement bar (shown on phone and desktop).
// Two identical groups so the -50% loop animation is seamless on any width.
function MarqueeBar() {
  return (
    <div
      className="w-full bg-white text-[#4F5A5E] py-2 overflow-hidden border-b border-[#EBE6DD] select-none"
      aria-label="New arrivals just dropped"
    >
      <div className="animate-marquee whitespace-nowrap text-[13px] sm:text-[14px] font-serif tracking-wide flex items-center">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center shrink-0" aria-hidden={group === 1}>
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-[10px] opacity-70">✦</span>
                <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Thin pink strip above the navigation: newsletter link + Instagram / email icons
function TopStrip() {
  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-8 grid grid-cols-[1fr_auto_1fr] items-center font-sans text-[10px] sm:text-[11px] tracking-[0.14em] uppercase">
        <span aria-hidden="true" />
        <Link href="/#newsletter" className="underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap">
          Get your ideas customized
        </Link>
        <div className="flex items-center justify-end gap-4">
          <a
            href="https://www.instagram.com/sewmaistic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition-opacity"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="mailto:sumaistic01@gmail.com" aria-label="Email us" className="hover:opacity-70 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <TopStrip />
      {/* ========================================================= */}
      {/* MOBILE HEADER (Visible on screens < md)                    */}
      {/* Exactly matching phone screenshot:                        */}
      {/* 1. Large centered logo on white                           */}
      {/* 2. Blush pink bar (#E8B7AF) with Hamburger, Cart, Search  */}
      {/* 3. White announcement ticker                              */}
      {/* ========================================================= */}
      <div className="md:hidden w-full">
        {/* 2. Blush pink action bar (#E8B7AF) */}
        <div className="w-full bg-white border-b border-[#EBE6DD] px-4 py-2 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Hamburger Menu Toggle on Left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="justify-self-start p-1.5 text-[#4F5A5E] hover:text-[#2E3A42] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 stroke-[1.8]" />
            ) : (
              <Menu className="w-7 h-7 stroke-[1.8]" />
            )}
          </button>

          {/* Centre: wordmark */}
          <Link href="/" aria-label="Sewmaistic home" className="justify-self-center pt-3">
            <span className="relative block text-center leading-none select-none">
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[28px] leading-none text-black pointer-events-none"
                style={{ fontFamily: "var(--font-script), cursive" }}
              >
                Sew
              </span>
              <span className="block font-serif text-[24px] font-medium tracking-[0.14em] uppercase text-[#2E3A42]">
                Maistic
              </span>
            </span>
          </Link>

          {/* Right Side: Cart + Search Pill */}
          <div className="justify-self-end flex items-center space-x-3">
            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#4F5A5E] hover:text-[#2E3A42] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#4F5A5E] text-white text-[10px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Rounded Search Pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 bg-white hover:bg-[#F2ECE1] text-[#4F5A5E] border border-[#4F5A5E] rounded-full px-3 py-1.5 text-[13px] font-sans transition-all"
            >
              <span className="tracking-wide hidden min-[400px]:inline">Search</span>
              <Search className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>

        {/* 3. Announcement marquee */}
        <MarqueeBar />

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-[#FBF9F4] px-5 py-4 border-b border-[#EBE6DD] animate-in slide-in-from-top-2 shadow-md">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#4F5A5E] hover:text-black font-serif text-[19px] tracking-wide border-b border-[#EFEBE4] pb-2"
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#4F5A5E] hover:text-black font-serif text-[19px] tracking-wide border-b border-[#EFEBE4] pb-2 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DESKTOP HEADER (Visible on screens >= md)                  */}
      {/* Nav left | "Sew" script + MAISTIC wordmark centre | Search right */}
      {/* ========================================================= */}
      <div className="hidden md:block w-full bg-[#FBF9F4] border-b border-[#EBE6DD] sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[64px]">
            {/* Left: navigation (single row on large screens) */}
            <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#4F5A5E] hover:text-black transition-colors font-serif text-[15px] xl:text-[17px] tracking-wide whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="lg:hidden" />

            {/* Centre: wordmark */}
            <Link href="/" aria-label="Sewmaistic home" className="justify-self-center pt-3">
              <span className="relative block text-center leading-none select-none">
                <span
                  className="absolute -top-5 left-1/2 -translate-x-1/2 text-[38px] leading-none text-black pointer-events-none"
                  style={{ fontFamily: "var(--font-script), cursive" }}
                >
                  Sew
                </span>
                <span className="block font-serif text-[34px] lg:text-[38px] font-medium tracking-[0.14em] uppercase text-[#2E3A42]">
                  Maistic
                </span>
              </span>
            </Link>

            {/* Right: cart + search */}
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#4F5A5E] hover:text-[#2E3A42] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[11px] font-medium w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 border border-[#4F5A5E] text-[#4F5A5E] hover:bg-[#F2ECE1] transition-colors rounded-full px-4 py-1.5 text-[14px] font-sans"
              >
                <span>Search</span>
                <Search className="w-4 h-4 opacity-70" />
              </button>
            </div>
          </div>

          {/* Navigation row for medium screens (not enough room beside the logo) */}
          <nav className="lg:hidden flex items-center justify-center gap-x-6 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#4F5A5E] hover:text-black transition-colors font-serif text-[16px] tracking-wide whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop announcement marquee, under the navigation */}
      <div className="hidden md:block w-full">
        <MarqueeBar />
      </div>
    </header>
  );
}

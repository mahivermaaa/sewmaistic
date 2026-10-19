"use client";

import React, { useState } from "react";
import Image from "next/image";
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

export function Header() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* ========================================================= */}
      {/* MOBILE HEADER (Visible on screens < md)                    */}
      {/* Exactly matching phone screenshot:                        */}
      {/* 1. Large centered logo on white                           */}
      {/* 2. Blush pink bar (#E8C7C8) with Hamburger, Cart, Search  */}
      {/* 3. White announcement ticker                              */}
      {/* ========================================================= */}
      <div className="md:hidden w-full">
        {/* 1. Logo area on pure white */}
        <div className="w-full bg-white flex justify-center items-center py-4 px-4 border-b border-[#EFEBE4]">
          <Link href="/" className="inline-block">
            <div className="w-[118px] h-[118px] rounded-full overflow-hidden border border-[#D5CEC2] shadow-xs bg-white flex items-center justify-center">
              <Image
                src="/sites/sewdarlin/root-default/logo.png"
                alt="Sewmaistic Logo"
                width={118}
                height={118}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* 2. Blush pink action bar (#E8C7C8) */}
        <div className="w-full bg-[#E8C7C8] px-4 py-2 flex items-center justify-between shadow-xs">
          {/* Hamburger Menu Toggle on Left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#4F5A5E] hover:text-[#2E3A42] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 stroke-[1.8]" />
            ) : (
              <Menu className="w-7 h-7 stroke-[1.8]" />
            )}
          </button>

          {/* Right Side: Cart + Search Pill */}
          <div className="flex items-center space-x-3">
            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-white/90 hover:text-white transition-colors"
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
              className="flex items-center space-x-2 bg-white/75 hover:bg-white text-[#4F5A5E] border border-white/80 rounded-full px-3.5 py-1 text-[13px] font-sans transition-all shadow-2xs"
            >
              <span className="tracking-wide">Search</span>
              <Search className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>

        {/* 3. Mobile Announcement Bar on pure white */}
        <div className="w-full bg-white text-[#4F5A5E] py-2 overflow-hidden border-b border-[#EBE6DD] select-none">
          <div className="animate-marquee whitespace-nowrap text-[13px] sm:text-[14px] font-serif tracking-wide flex items-center">
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
            <span className="mx-3">NEW ARRIVALS JUST DROPPED</span>
            <span className="text-[10px] opacity-70">✦</span>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="bg-[#FBF9F4] px-5 py-4 border-b border-[#EBE6DD] animate-in slide-in-from-top-2 shadow-md">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#4F5A5E] hover:text-[#D8A7A7] font-serif text-[19px] tracking-wide border-b border-[#EFEBE4] pb-2 last:border-0"
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
      {/* ========================================================= */}
      <div className="hidden md:block w-full bg-[#FBF9F4] border-b border-[#EBE6DD] sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-3 pb-2 relative">
          <div className="flex items-center justify-between min-h-[80px]">
            {/* Logo Centered */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="inline-block group">
                <div className="w-[96px] h-[96px] rounded-full overflow-hidden border border-[#D5CEC2] shadow-xs group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center">
                  <Image
                    src="/sites/sewdarlin/root-default/logo.png"
                    alt="Sewmaistic Logo"
                    width={96}
                    height={96}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-4 ml-auto">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#4F5A5E] hover:text-[#2E3A42] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D8A7A7] text-white text-[11px] font-medium w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in-50">
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

          {/* Desktop Navigation Links */}
          <nav className="flex items-center justify-center space-x-10 pt-4 pb-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#4F5A5E] hover:text-[#D8A7A7] transition-colors font-serif text-[18px] tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

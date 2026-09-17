"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  THFLogoLong,
  THFCupIcon,
  UserIcon,
  CartIcon,
  MapPinIcon,
  ChevronDownIcon
} from "../shared/icons";

export function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [giftingOpen, setGiftingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="w-full fixed top-0 left-0 z-[100] transition-colors duration-500 ease-out"
      style={{
        background: "rgba(52, 78, 65, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(163, 177, 138, 0.25)",
      }}
    >
      <div
        className="w-full flex items-center justify-between px-6 md:px-14"
        style={{ height: "clamp(54px, 6vw, 68px)" }}
      >
        {/* Left: Logo Text */}
        <Link href="/" className="flex items-center shrink-0 no-underline">
          <span
            className="font-editorial text-lg sm:text-xl md:text-2xl font-bold tracking-[0.16em] uppercase text-[#DAD7CD] hover:text-[#A3B18A] transition-colors"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            THE SUGAR HOUSE
          </span>
        </Link>

        {/* Center/Right Desktop Navigation */}
        <div className="flex items-center gap-6 md:gap-8 shrink-0">
          <nav className="hidden min-[1317px]:flex items-center gap-8">
            {/* SHOP ALL Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                type="button"
                onClick={() => setShopOpen(!shopOpen)}
                className="no-underline whitespace-nowrap uppercase font-semibold tracking-wider inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-300 text-[#DAD7CD] hover:text-[#A3B18A]"
                style={{
                  fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)",
                }}
              >
                SHOP ALL
                <ChevronDownIcon
                  className="transition-transform duration-300 text-[#A3B18A]"
                  style={{
                    transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {shopOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 rounded-xl p-3 shadow-2xl border transition-all duration-200"
                  style={{
                    background: "#344E41",
                    backdropFilter: "blur(20px)",
                    borderColor: "#3A5A40",
                  }}
                >
                  <ul className="flex flex-col gap-1 text-sm">
                    <li>
                      <Link
                        href="#category-grid"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Labon® Collection
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#category-grid"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Artisanal Baklava
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#category-grid"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Fusion Mithai
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#category-grid"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Luxury Gift Boxes
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* GIFTING Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGiftingOpen(true)}
              onMouseLeave={() => setGiftingOpen(false)}
            >
              <button
                type="button"
                onClick={() => setGiftingOpen(!giftingOpen)}
                className="no-underline whitespace-nowrap uppercase font-semibold tracking-wider inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-300 text-[#DAD7CD] hover:text-[#A3B18A]"
                style={{
                  fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)",
                }}
              >
                GIFTING
                <ChevronDownIcon
                  className="transition-transform duration-300 text-[#A3B18A]"
                  style={{
                    transform: giftingOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {giftingOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 rounded-xl p-3 shadow-2xl border transition-all duration-200"
                  style={{
                    background: "#344E41",
                    backdropFilter: "blur(20px)",
                    borderColor: "#3A5A40",
                  }}
                >
                  <ul className="flex flex-col gap-1 text-sm">
                    <li>
                      <Link
                        href="#build-byob"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Build Your Own Box
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#corporate-clients"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Corporate Gifting
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#build-byob"
                        className="block px-3 py-2 rounded-lg text-[#DAD7CD] hover:text-[#FFFFFF] hover:bg-[#3A5A40] transition-colors"
                      >
                        Weddings & Events
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Our Story Link */}
            <Link
              href="#labon-spotlight"
              className="no-underline whitespace-nowrap uppercase font-semibold tracking-wider transition-colors duration-300 text-[#DAD7CD] hover:text-[#A3B18A]"
              style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)" }}
            >
              Our Story
            </Link>

            {/* Events Link */}
            <Link
              href="#press-coverage"
              className="no-underline whitespace-nowrap uppercase font-semibold tracking-wider transition-colors duration-300 text-[#DAD7CD] hover:text-[#A3B18A]"
              style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)" }}
            >
              Events
            </Link>

            {/* Stores Pill Button */}
            <Link
              href="#footer"
              className="no-underline whitespace-nowrap uppercase inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:scale-105"
              style={{
                fontSize: "clamp(0.72rem, 0.88vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "0.38rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid #A3B18A",
                background: "#588157",
                color: "#DAD7CD",
              }}
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#DAD7CD]" />
              Stores
            </Link>
          </nav>

          {/* User Profile */}
          <Link
            href="#footer"
            aria-label="Profile"
            className="hidden min-[1317px]:flex items-center justify-center transition-opacity duration-200 hover:opacity-75 text-[#DAD7CD] hover:text-[#A3B18A]"
          >
            <UserIcon className="w-5 h-5" />
          </Link>

          {/* THF Brew Club */}
          <Link
            href="#footer"
            aria-label="THF Brew Club"
            className="flex items-center justify-center transition-opacity duration-200 hover:opacity-75"
          >
            <THFCupIcon
              className="w-5 h-5 animate-brew-wobble"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Cart Bag */}
          <Link
            href="#footer"
            aria-label="Cart"
            className="hidden min-[1317px]:flex items-center justify-center transition-opacity duration-200 hover:opacity-75 text-[#DAD7CD] hover:text-[#A3B18A]"
          >
            <CartIcon className="w-5 h-5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1317px]:hidden flex flex-col items-end gap-[5px] p-2 bg-transparent border-0 cursor-pointer text-[#DAD7CD]"
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-[1.5px] w-[22px] bg-current transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[22px] bg-current transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-transform duration-300 ${
                mobileMenuOpen
                  ? "w-[22px] -rotate-45 -translate-y-[6.5px]"
                  : "w-[14px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="min-[1317px]:hidden fixed inset-x-0 top-[54px] bottom-0 z-[90] flex flex-col p-6 overflow-y-auto"
          style={{
            background: "#344E41",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid #3A5A40",
          }}
        >
          <nav className="flex flex-col gap-6 text-lg font-semibold tracking-wider uppercase">
            <Link
              href="#category-grid"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#DAD7CD] hover:text-[#A3B18A]"
            >
              Shop All
            </Link>
            <Link
              href="#build-byob"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#DAD7CD] hover:text-[#A3B18A]"
            >
              Build Your Own Box
            </Link>
            <Link
              href="#labon-spotlight"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#DAD7CD] hover:text-[#A3B18A]"
            >
              Our Story
            </Link>
            <Link
              href="#corporate-clients"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#DAD7CD] hover:text-[#A3B18A]"
            >
              Corporate Gifting
            </Link>
            <Link
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-[#A3B18A]"
            >
              <MapPinIcon className="w-5 h-5" />
              Stores Locator
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

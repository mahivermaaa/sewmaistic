import React from "react";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/sewmaistic/";

export function Footer() {
  const links = [
    { label: "Meet The Maker", href: INSTAGRAM_URL },
    { label: "Shipping & Returns", href: INSTAGRAM_URL },
    { label: "Contact Us", href: INSTAGRAM_URL },
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
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] sm:text-[15px] font-sans text-white/95 hover:text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom row with copyright */}
        <div className="w-full flex items-center justify-center pt-6 border-t border-white/20 text-center">
          <p className="text-[13px] text-white/80 font-sans">
            © 2026 Sewmaistic
          </p>
        </div>
      </div>
    </footer>
  );
}

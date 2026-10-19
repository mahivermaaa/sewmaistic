"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function NewsletterSection() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !agreed) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#FBF9F4] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#EBE6DD]">
      <div className="max-w-[620px] mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="font-serif text-[34px] sm:text-[42px] text-[#4F5A5E] mb-6 tracking-tight">
          Find Us Online
        </h2>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="https://www.instagram.com/sewdarlin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Instagram"
          >
            <div className="w-[38px] h-[38px] relative">
              <Image
                src="/sites/sewdarlin/root-default/icon-instagram.png"
                alt="Instagram"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="https://www.facebook.com/sewdarlin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Facebook"
          >
            <div className="w-[38px] h-[38px] relative">
              <Image
                src="/sites/sewdarlin/root-default/icon-facebook.png"
                alt="Facebook"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="https://www.tiktok.com/@sewdarlin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="TikTok"
          >
            <div className="w-[38px] h-[38px] relative">
              <Image
                src="/sites/sewdarlin/root-default/icon-tiktok.png"
                alt="TikTok"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[15px] sm:text-[16px] text-[#4F5A5E] mb-8">
          We only send emails once or twice a month, good stuff only!
        </p>

        {submitted ? (
          <div className="bg-[#EBF3EA] border border-[#BFDBB9] text-[#2F5229] rounded-xl p-6 w-full animate-in zoom-in-95">
            <h4 className="font-serif text-[22px] mb-1">Thank you for joining our circle!</h4>
            <p className="text-[14px]">You’re officially on our darling list. Check your inbox soon for sweet updates.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
            {/* First Name */}
            <div className="w-full text-left">
              <input
                type="text"
                required
                placeholder="First name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-transparent border-b border-[#9EA8AC] focus:border-[#4F5A5E] outline-hidden py-2 px-1 text-[15px] text-[#2E3A42] placeholder-[#7E8C91] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="w-full text-left">
              <input
                type="email"
                required
                placeholder="Enter Your Email Here *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#9EA8AC] focus:border-[#4F5A5E] outline-hidden py-2 px-1 text-[15px] text-[#2E3A42] placeholder-[#7E8C91] transition-colors"
              />
            </div>

            {/* Checkbox */}
            <div className="w-full flex items-center justify-start space-x-2.5 pt-2 text-left">
              <label className="flex items-center space-x-2 text-[13px] text-[#4F5A5E] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-[#9EA8AC] text-[#D8A7A7] focus:ring-[#D8A7A7]"
                />
                <span>Yes, subscribe me to your newsletter.*</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-full pt-4">
              <button
                type="submit"
                className="w-full sm:w-[240px] border border-[#4F5A5E] hover:bg-[#4F5A5E] text-[#4F5A5E] hover:text-white rounded-full py-2.5 px-8 text-[14px] font-sans tracking-wide transition-all duration-300 shadow-2xs hover:shadow-xs"
              >
                Subscribe Now
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

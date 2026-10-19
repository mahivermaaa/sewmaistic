"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function DiscountPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("sewdarlin_promo_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("sewdarlin_promo_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#FBF9F4] rounded-2xl shadow-2xl border border-[#E5DFD5] p-6 sm:p-8 text-center z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#7A878B] hover:text-[#2E3A42] transition-colors"
          aria-label="Close promotion"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-[#D5CEC2] bg-white flex items-center justify-center">
          <Image
            src="/sites/sewdarlin/root-default/logo.png"
            alt="Sewmaistic"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <span className="inline-flex items-center text-xs tracking-widest uppercase font-serif text-[#D8A7A7] font-semibold mb-2">
          ✦ Be an Insider ✦
        </span>

        <h3 className="font-serif text-[28px] sm:text-[32px] text-[#2E3A42] leading-tight mb-2">
          Never Miss a Drop!
        </h3>
        <p className="font-sans text-[14px] text-[#556368] mb-6 leading-relaxed">
          Our quirky, handcrafted pieces are made in tiny batches and find homes fast. Join the list to get first dibs before public restocks.
        </p>

        {submitted ? (
          <div className="bg-[#EBF3EA] text-[#2F5229] p-3 rounded-lg text-sm font-sans animate-in zoom-in-95">
            You&apos;re on the list! We&apos;ll be in touch before the next drop.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 font-sans">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#D5CEC2] focus:border-[#4F5A5E] rounded-full py-2.5 px-4 text-sm text-[#2E3A42] outline-hidden placeholder-[#9EA8AC]"
            />
            <button
              type="submit"
              className="w-full bg-[#D8A7A7] hover:bg-[#C89696] text-[#34444F] font-medium py-2.5 rounded-full text-sm transition-all shadow-2xs hover:shadow-xs active:scale-98"
            >
              Keep Me in the Loop
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs text-[#8C989C] hover:text-[#4F5A5E] underline underline-offset-2 transition-colors pt-1"
            >
              No thanks, I’ll browse on my own
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

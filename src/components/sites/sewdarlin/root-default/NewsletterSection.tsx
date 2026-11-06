"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [wants, setWants] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !wants.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/customizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: firstName, email, wants }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="newsletter" className="w-full bg-[#FBF9F4] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#EBE6DD]">
      <div className="max-w-[620px] mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="font-serif text-[34px] sm:text-[42px] text-[#4F5A5E] mb-6 tracking-tight">
          Want Customizations?
        </h2>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="https://www.instagram.com/sewmaistic/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Instagram"
          >
            <div className="w-[38px] h-[38px] rounded-[10px] bg-black flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none" />
              </svg>
            </div>
          </Link>
          <a
            href="mailto:sewmaistic@gmail.com"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Email"
          >
            <div className="w-[38px] h-[38px] rounded-[10px] bg-black flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
          </a>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[15px] sm:text-[16px] text-[#4F5A5E] mb-8">
          Pick your vibe, add your personal touch, and create something that’s uniquely you.
        </p>

        {submitted ? (
          <div className="bg-[#EBF3EA] border border-[#BFDBB9] text-[#2F5229] rounded-xl p-6 w-full animate-in zoom-in-95">
            <h4 className="font-serif text-[22px] mb-1">Thank you, we got your idea!</h4>
            <p className="text-[14px]">We’ll get back to you on your email soon.</p>
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

            {/* What do you want? */}
            <div className="w-full text-left">
              <textarea
                rows={3}
                required
                placeholder="What do you want? *"
                value={wants}
                onChange={(e) => setWants(e.target.value)}
                className="w-full bg-transparent border-b border-[#9EA8AC] focus:border-[#4F5A5E] outline-hidden py-2 px-1 text-[15px] text-[#2E3A42] placeholder-[#7E8C91] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full pt-4">
              {error && <p className="text-[13px] text-red-700 mb-3">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-[240px] border border-[#4F5A5E] hover:bg-[#4F5A5E] text-[#4F5A5E] hover:text-white rounded-full py-2.5 px-8 text-[14px] font-sans tracking-wide transition-all duration-300 shadow-2xs hover:shadow-xs"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

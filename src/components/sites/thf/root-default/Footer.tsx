"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  PlusIcon,
  MinusIcon,
  UserIcon,
  ArrowRightIcon,
  THFHeaderLogo
} from "../shared/icons";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Can I customise my own gift box?",
    answer:
      "Yes. Our Build Your Own Box tool lets you choose a box, pick your sweets, add a ribbon, and include a personalized message for weddings, corporate gifting, or any occasion.",
  },
  {
    question: "Do you offer corporate and bulk gifting?",
    answer:
      "Yes, we offer curated corporate gifting solutions for bulk and business orders. Visit our Corporate Gifting section or contact us to discuss your requirements.",
  },
  {
    question: "What is your shipping and delivery policy?",
    answer:
      "We ship pan-India with specialized temperature-controlled packaging. Shipping charges are calculated based on your delivery pincode.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "Because our handcrafted sweets are perishable food products, we offer replacements or refunds for damaged shipments reported within 24 hours of delivery.",
  },
  {
    question: "Do you have physical stores?",
    answer:
      "Yes! We have flagship retail stores and cafes in Lucknow, Kanpur, Meerut, and major North India locations.",
  },
];

export function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", mobile: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <footer
      id="footer"
      className="font-sans bg-[#344E41] text-[#DAD7CD] border-t border-[#3A5A40] relative"
    >
      <div className="px-6 md:px-16 pt-16 pb-10 max-w-7xl mx-auto">
        {/* Top Grid: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-14">
          {/* Column 1: Brand Info */}
          <div>
            <p
              className="font-editorial text-3xl md:text-4xl font-semibold leading-tight mb-4 text-[#DAD7CD]"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Crafted Fresh,
              <br />
              Savoured Always.
            </p>
            <p className="text-sm leading-relaxed mb-6 text-[rgba(218,215,205,0.75)] font-medium">
              Handcrafted sweets and treats made
              <br />
              with the finest ingredients.
            </p>
            <a
              href="https://www.instagram.com/thesugarhouse.india"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#DAD7CD] hover:text-[#A3B18A] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#A3B18A]" />
              <span>@thesugarhouse.india</span>
            </a>
          </div>

          {/* Column 2: Shop & Policies */}
          <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
            <div>
              <p className="text-xs font-bold tracking-widest mb-5 uppercase text-[#A3B18A]">
                Shop
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#labon-spotlight"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#build-byob"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Build Your Own Box
                  </Link>
                </li>
                <li>
                  <Link
                    href="#corporate-clients"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Corporate Gifting
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest mb-5 uppercase text-[#A3B18A]">
                Policies
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#footer"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Terms & Services
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Refund & Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                  >
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Company Links */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-5 uppercase text-[#A3B18A]">
              Company
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#labon-spotlight"
                  className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                >
                  About The Sugar House
                </Link>
              </li>
              <li>
                <Link
                  href="#press-coverage"
                  className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                >
                  In The Press
                </Link>
              </li>
              <li>
                <a
                  href="#footer"
                  className="text-[#DAD7CD] hover:text-[#FFFFFF] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form & FAQ Combined Card */}
        <div
          className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border"
          style={{
            borderColor: "#3A5A40",
            background: "rgba(58, 90, 64, 0.25)",
          }}
        >
          {/* Left: Contact Form */}
          <div className="p-6 md:p-8">
            <p className="text-xs font-bold tracking-widest mb-1 uppercase text-[#A3B18A]">
              Get in Touch
            </p>
            <p className="text-xs mb-5 text-[rgba(218,215,205,0.75)]">
              Questions about an order or a custom box? Send us a message.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl border border-[#A3B18A] bg-[#588157] text-[#DAD7CD] text-sm font-semibold text-center">
                ✓ Thank you! Your message has been received. Our team will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                    style={{
                      background: "rgba(52, 78, 65, 0.6)",
                      border: "1px solid #3A5A40",
                    }}
                  >
                    <UserIcon className="w-4 h-4 text-[#A3B18A] shrink-0" />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none text-[#DAD7CD] placeholder:text-[rgba(218,215,205,0.5)]"
                    />
                  </div>

                  <div
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                    style={{
                      background: "rgba(52, 78, 65, 0.6)",
                      border: "1px solid #3A5A40",
                    }}
                  >
                    <PhoneIcon className="w-4 h-4 text-[#A3B18A] shrink-0" />
                    <input
                      type="tel"
                      placeholder="Mobile"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none text-[#DAD7CD] placeholder:text-[rgba(218,215,205,0.5)]"
                    />
                  </div>
                </div>

                <div
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                  style={{
                    background: "rgba(52, 78, 65, 0.6)",
                    border: "1px solid #3A5A40",
                  }}
                >
                  <MailIcon className="w-4 h-4 text-[#A3B18A] shrink-0" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 min-w-0 bg-transparent text-sm outline-none text-[#DAD7CD] placeholder:text-[rgba(218,215,205,0.5)]"
                  />
                </div>

                <div
                  className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
                  style={{
                    background: "rgba(52, 78, 65, 0.6)",
                    border: "1px solid #3A5A40",
                  }}
                >
                  <textarea
                    rows={2}
                    placeholder="Your message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="flex-1 min-w-0 bg-transparent text-sm outline-none resize-none text-[#DAD7CD] placeholder:text-[rgba(218,215,205,0.5)]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-2.5 mt-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] cursor-pointer transition-colors duration-300 bg-[#588157] text-[#DAD7CD] hover:bg-[#3A5A40]"
                >
                  Send Message
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right: FAQ Accordion */}
          <div className="p-6 md:p-8">
            <p className="text-xs font-bold tracking-widest mb-4 uppercase text-[#A3B18A]">
              Frequently Asked Questions
            </p>

            <div className="space-y-1">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border-b border-[#3A5A40] py-3 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span className="text-[0.85rem] font-medium text-[#DAD7CD] group-hover:text-[#A3B18A] transition-colors">
                        {faq.question}
                      </span>
                      <span
                        className="flex items-center justify-center shrink-0 rounded-full transition-colors duration-200"
                        style={{
                          width: "20px",
                          height: "20px",
                          background: "#3A5A40",
                        }}
                      >
                        {isOpen ? (
                          <MinusIcon className="w-3 h-3 text-[#DAD7CD]" />
                        ) : (
                          <PlusIcon className="w-3 h-3 text-[#DAD7CD]" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-2 text-xs text-[rgba(218,215,205,0.85)] leading-relaxed animate-fadeIn">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Customer Care & Address Details */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8 border-t border-[#3A5A40] text-xs text-[rgba(218,215,205,0.8)]">
          <div className="flex flex-col gap-2 max-w-md">
            <p className="font-bold tracking-widest uppercase text-[#A3B18A]">
              Customer Care
            </p>
            <a
              href="mailto:info@thesugarhouse.com"
              className="flex items-center gap-2 hover:text-[#A3B18A] transition-colors text-sm"
            >
              <MailIcon className="w-3.5 h-3.5 text-[#A3B18A]" />
              info@thesugarhouse.com
            </a>
            <a
              href="tel:+917084400400"
              className="flex items-center gap-2 hover:text-[#A3B18A] transition-colors text-sm"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#A3B18A]" />
              Customer Care No. +91 70844 00400
            </a>
            <div className="flex items-start gap-2 mt-1">
              <MapPinIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#A3B18A]" />
              <span>
                B-192, Aliganj Main Rd, Opp. Ram Krishna Math, Nirala Nagar, Lucknow, Uttar Pradesh 226020.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[rgba(218,215,205,0.7)] max-w-sm">
            <p className="font-bold text-xs text-[#DAD7CD] mb-1">
              SUGAR HOUSE FOOD PRODUCTS PRIVATE LIMITED
            </p>
            <p>CIN - U15412UP2019PTC124722</p>
            <p>Registered office at Khasra No-189, Ganeshpur Rehmanpur, Dewa Road, Chinhat, Lucknow - 226028</p>
            <p>GSTIN - 09AAFCH1474B1ZU</p>
            <p>FSSAI NO - 12722066001772</p>
          </div>
        </div>

        {/* Faded Watermark Text */}
        <div className="mt-12 overflow-hidden flex justify-center">
          <span
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] uppercase text-[#DAD7CD] opacity-15 select-none text-center"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            THE SUGAR HOUSE
          </span>
        </div>

        {/* Bottom Bar: Copyright & TechBRJ credit */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#3A5A40] text-xs text-[rgba(218,215,205,0.6)]">
          <p>© 2026 The Sugar House. All rights reserved.</p>
          <p>
            Design & Build by{" "}
            <a
              href="https://www.techbrj.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#A3B18A]"
            >
              TechBRJ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

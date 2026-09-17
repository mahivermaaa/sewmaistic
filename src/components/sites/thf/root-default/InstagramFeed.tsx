"use client";

import React from "react";
import { InstagramIcon } from "../shared/icons";

const instaImages = [
  "/sites/thf/root-default/carousel/1.jpg",
  "/sites/thf/root-default/carousel/2.jpg",
  "/sites/thf/root-default/carousel/3.jpg",
  "/sites/thf/root-default/carousel/4.jpg",
  "/sites/thf/root-default/carousel/5.jpg",
  "/sites/thf/root-default/carousel/6.jpg",
];

export function InstagramFeed() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#DAD7CD] relative overflow-hidden border-t border-[#A3B18A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3A5A40] block mb-1">
              Social Community
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#344E41]"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Follow the craft — @thesugarhouse.mithai
            </h2>
          </div>

          <a
            href="https://www.instagram.com/thesugarhouse.india"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 bg-[#588157] text-[#DAD7CD] hover:bg-[#3A5A40] shrink-0 self-start sm:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-[#DAD7CD]" />
            Open Instagram
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {instaImages.map((src, index) => (
            <a
              key={index}
              href="https://www.instagram.com/thesugarhouse.india"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#A3B18A] bg-white block shadow-sm"
            >
              <img
                src={src}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#344E41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-[#DAD7CD]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

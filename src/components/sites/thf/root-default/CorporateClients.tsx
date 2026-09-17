"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../shared/icons";

const clientLogos = [
  { name: "BMW", src: "/sites/thf/root-default/clients/bmw.png" },
  { name: "Mercedes-Benz", src: "/sites/thf/root-default/clients/mercedes-benz-seeklogo.png" },
  { name: "JW Marriott", src: "/sites/thf/root-default/clients/jw-marriott-washington.png" },
  { name: "HDFC Bank", src: "/sites/thf/root-default/clients/hdfc.png" },
  { name: "ICICI Bank", src: "/sites/thf/root-default/clients/icici.png" },
  { name: "PepsiCo", src: "/sites/thf/root-default/clients/pepsico.png" },
  { name: "Tanishq", src: "/sites/thf/root-default/clients/tanishq.png" },
  { name: "Adani", src: "/sites/thf/root-default/clients/adani.png" },
  { name: "Coca-Cola", src: "/sites/thf/root-default/clients/coca-cola-seeklogo.png" },
  { name: "Volvo", src: "/sites/thf/root-default/clients/volvo.png" },
  { name: "MP Birla Group", src: "/sites/thf/root-default/clients/mp-birla-group.png" },
  { name: "ACC Cement", src: "/sites/thf/root-default/clients/acc-cement.png" },
];

export function CorporateClients() {
  return (
    <section
      id="corporate-clients"
      className="w-full py-16 md:py-24 bg-[#DAD7CD] relative overflow-hidden border-t border-[#A3B18A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3A5A40] block mb-2">
              Corporate & Bulk Gifting
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold font-editorial text-[#344E41]"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              Trusted by India&apos;s Leading Brands
            </h2>
          </div>

          <Link
            href="#footer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 bg-[#588157] text-[#DAD7CD] hover:bg-[#3A5A40] shrink-0 self-start md:self-auto"
          >
            Enquire Now
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {clientLogos.map((client, idx) => (
            <div
              key={idx}
              className="h-24 rounded-xl border flex items-center justify-center p-4 transition-all duration-300 hover:border-[#3A5A40] bg-white shadow-sm hover:shadow-md group"
              style={{
                borderColor: "#A3B18A",
              }}
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Star } from "lucide-react";
import { PRODUCT_REVIEWS, SHOW_SAMPLE_REVIEWS, SAMPLE_REVIEW_POOL } from "@/data/reviews";

function pickSample(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return SAMPLE_REVIEW_POOL[h % SAMPLE_REVIEW_POOL.length];
}

export function ProductReview({ productId, productTitle }: { productId: string; productTitle: string }) {
  const real = PRODUCT_REVIEWS[productId];
  const sample = !real && SHOW_SAMPLE_REVIEWS ? pickSample(productId) : null;
  const review = real ?? (sample && { ...sample, author: "Sample review" });
  if (!review) return null;

  return (
    <div className="mt-4 w-full rounded-lg bg-[#F9F9F9] px-3 py-4 text-center">
      <p className="font-serif text-[13px] leading-snug text-[#2E3A42] line-clamp-4 min-h-[36px]">{review.text}</p>
      <div className="mt-3 flex justify-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className="w-4 h-4 text-black" fill={n <= review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </div>
      <p className={`mt-2 font-serif text-[13px] ${sample ? "italic text-[#8C989C]" : "font-bold text-black"}`}>{review.author}</p>
      <p className="mt-1 font-serif text-[12px] text-[#8C989C] line-clamp-1">{productTitle}</p>
    </div>
  );
}

import React from "react";
import { Star } from "lucide-react";

// Shows the review set for this product from the admin panel (Products -> Edit -> Review).
// No placeholder text is shown when a product has none set.
export function ProductReview({ text, rating }: { text?: string; rating?: number }) {
  if (!text) return null;
  const stars = rating && rating >= 1 && rating <= 5 ? rating : 5;

  return (
    <div className="mt-2 w-full rounded-lg bg-[#F9F9F9] px-3 py-3 text-center">
      <p className="font-serif text-[13px] leading-snug text-[#2E3A42] line-clamp-4 min-h-[36px]">{text}</p>
      <div className="mt-1 flex justify-center gap-0.5" aria-label={`${stars} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className="w-4 h-4 text-black" fill={n <= stars ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </div>
    </div>
  );
}

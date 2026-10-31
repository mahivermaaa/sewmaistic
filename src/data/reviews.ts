export interface ProductReviewData {
  text: string;
  author: string; // e.g. "P.S." (initials only)
  rating: number; // 1-5
}

// Real customer reviews only, keyed by product id (the `id` in sewdarlinData.ts).
// Example:
// "strawberry-hair-bow": { text: "…customer's own words…", author: "A.B.", rating: 5 },
export const PRODUCT_REVIEWS: Record<string, ProductReviewData> = {};

// DEMO ONLY: when true, products without a real review show a lorem ipsum
// placeholder. Set to false before the site goes live.
export const SHOW_SAMPLE_REVIEWS = true;

export const SAMPLE_REVIEW_POOL: { text: string; rating: number }[] = [
  { text: "Lorem ipsum dolor sit amet.", rating: 5 },
  { text: "Consectetur adipiscing elit.", rating: 5 },
  { text: "Sed do eiusmod tempor.", rating: 5 },
  { text: "Ut enim ad minim veniam.", rating: 5 },
  { text: "Duis aute irure dolor.", rating: 5 },
  { text: "Excepteur sint occaecat.", rating: 5 },
];

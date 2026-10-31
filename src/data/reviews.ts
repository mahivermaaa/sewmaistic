export interface ProductReviewData {
  text: string;
  author: string; // e.g. "P.S." (initials only)
  rating: number; // 1-5
}

// Real customer reviews only, keyed by product id (the `id` in sewdarlinData.ts).
// Example:
// "strawberry-hair-bow": { text: "…customer's own words…", author: "A.B.", rating: 5 },
export const PRODUCT_REVIEWS: Record<string, ProductReviewData> = {};

// DEMO ONLY: when true, products without a real review show a placeholder
// clearly labelled "Sample review". Set to false before the site goes live.
export const SHOW_SAMPLE_REVIEWS = true;

export const SAMPLE_REVIEW_POOL: { text: string; rating: number }[] = [
  { text: "Lovely stitching, feels sturdy.", rating: 5 },
  { text: "Colours look just like the photos.", rating: 5 },
  { text: "Cute and well made.", rating: 5 },
  { text: "Great quality for the price.", rating: 4 },
  { text: "Soft fabric, neat finish.", rating: 5 },
  { text: "Arrived well packed.", rating: 4 },
  { text: "Perfect gift idea.", rating: 5 },
  { text: "Looks even better in person.", rating: 5 },
];

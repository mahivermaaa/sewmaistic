import { sanityMutate, sanityQuery } from "./sanityAdmin";
import { REVIEWS as DEFAULT_REVIEWS } from "@/data/sewdarlinData";

export interface ReviewRow {
  _id: string;
  author: string;
  quote: string;
  sortOrder?: number;
}

const Q = `*[_type == "review" && defined(author) && defined(quote) && !(_id in path("drafts.**"))]
  | order(coalesce(sortOrder, 0) asc, _createdAt asc){ _id, author, quote, sortOrder }`;

// Reads the review list; the very first time (none saved yet) it saves the built-in starting reviews.
export async function loadReviews(): Promise<ReviewRow[]> {
  const rows = await sanityQuery<ReviewRow[]>(Q);
  if (rows.length > 0) return rows;
  await sanityMutate(
    DEFAULT_REVIEWS.map((r, i) => ({
      createIfNotExists: {
        _id: `review-${r.id}`,
        _type: "review",
        author: r.author,
        quote: r.quote,
        sortOrder: i,
      },
    }))
  );
  return sanityQuery<ReviewRow[]>(Q);
}

export function validReviewFields(author: unknown, quote: unknown): { author: string; quote: string } | null {
  const a = typeof author === "string" ? author.trim().replace(/\s+/g, " ") : "";
  const q = typeof quote === "string" ? quote.trim() : "";
  if (!a || a.length > 60) return null;
  if (!q || q.length > 600) return null;
  return { author: a, quote: q };
}

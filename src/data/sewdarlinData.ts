import { Collection, Review } from "@/types/sewdarlin";

// Products now live in Sanity (see src/lib/catalogue.ts). A local backup copy is in products-seed.json.

// Exactly the 5 requested categories in the exact order requested:
// 1. shop bags
// 2. shop cosplay costumes
// 3. Thrift Store
// 4. shop little somethings
// 5. shop sale
export const COLLECTIONS: Collection[] = [
  {
    id: "shop-bags",
    title: "Bags",
    buttonText: "Shop Bags",
    image: "/sites/sewdarlin/root-default/col-bows.jpg", // Contains high-res "Shop Bags"
    hasOverlayText: true,
    link: "/category/bags",
  },
  {
    id: "shop-cosplay-costumes",
    title: "Cosplay Costumes",
    buttonText: "Shop Cosplay Costumes",
    scriptText: "Shop",
    displayTitle: "Cosplay Costumes",
    image: "/sites/sewdarlin/root-default/col-cosplay.jpg",
    hasOverlayText: false,
    link: "/category/cosplay-costumes",
  },
  {
    id: "thrift-store",
    title: "Thrift Store",
    buttonText: "Thrift Store",
    scriptText: "Shop",
    displayTitle: "Thrift Store",
    image: "/sites/sewdarlin/root-default/col-thrift.jpg",
    hasOverlayText: false,
    link: "/category/thrift-store",
  },
  {
    id: "shop-little-somethings",
    title: "Little Somethings",
    buttonText: "Shop Little Somethings",
    scriptText: "Shop",
    displayTitle: "Little Somethings",
    image: "/sites/sewdarlin/root-default/col-little-somethings.jpg",
    hasOverlayText: false,
    link: "/category/little-somethings",
  },
  {
    id: "shop-sale",
    title: "Sale",
    buttonText: "Shop Sale",
    image: "/sites/sewdarlin/root-default/col-sale.png", // Contains high-res "Shop Sale"
    hasOverlayText: true,
    link: "/category/sale",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    author: "XYZ",
    quote:
      "Such a lovely collection! Found some really unique pieces that you don't usually come across in regular stores. The clothes were in great condition and the whole shopping experience was smooth. Love finding affordable fashion like this!",
  },
  {
    id: "review-2",
    author: "XYZ",
    quote:
      "Absolutely loved my bag! The attention to detail is amazing and you can genuinely see the effort that goes into making each piece. The quality is great and it looks even better in person. Definitely ordering again!",
  },
  {
    id: "review-3",
    author: "XYZ",
    quote:
      "Everything is so beautifully made! You can tell that each piece is created with so much creativity and care. I ordered a clay piece and it turned out even prettier than I expected. Such a cute little store for anyone who loves handmade things!",
  },
];

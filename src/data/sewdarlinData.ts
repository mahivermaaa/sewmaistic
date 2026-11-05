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
      "Literally the most perfect ereader sleeve! The seller was super kind and easy to deal with. They quickly made and sent my custom sized order to ensure it would arrive before Christmas. Would 100% purchase again and recommend to others.",
  },
  {
    id: "review-2",
    author: "XYZ",
    quote:
      "Gorgeous colours and well made. My daughter loves them thank you!",
  },
  {
    id: "review-3",
    author: "XYZ",
    quote:
      "Custom made 17 scrunchies for me to gift at our hens party giveaway. They were made to great quality, shipped quickly and I’ve had so many compliments - the girls all loved them!",
  },
];

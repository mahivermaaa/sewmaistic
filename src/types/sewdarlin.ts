export interface Product {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  image: string;
  images?: string[]; // optional extra photos shown as a gallery in Quick View
  category: string;
  outOfStock?: boolean;
  description?: string;
  badge?: string;
  isNewArrival?: boolean;
  isFanFavourite?: boolean;
  currency?: "INR"; // omit for AUD
  reviewText?: string; // short customer-review snippet shown under "Add to Cart"
  reviewRating?: number; // 1-5, shown as stars next to reviewText
}

export interface Collection {
  id: string;
  title: string;
  buttonText: string;
  image: string;
  link: string;
  scriptText?: string;
  displayTitle?: string;
  hasOverlayText?: boolean;
}

export interface Review {
  id: string;
  author: string;
  quote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

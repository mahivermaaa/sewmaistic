export interface Product {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  image: string;
  category: string;
  outOfStock?: boolean;
  description?: string;
  badge?: string;
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

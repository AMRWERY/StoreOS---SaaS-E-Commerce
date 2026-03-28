export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: { text: string; type: "new" | "sale" };
}

export interface FilterState {
  category: string;
  priceMin: number;
  priceMax: number;
  selectedSize: string;
  selectedColor: string;
}

export interface StorefrontProduct {
  id: number;
  slug: string;
  name: string;
  cat: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  tagColor?: string;
  img: string;
}

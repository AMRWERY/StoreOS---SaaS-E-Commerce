export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: { text: string; type: "new" | "sale" };
}

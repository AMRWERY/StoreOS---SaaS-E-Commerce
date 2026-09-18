export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  status: "active" | "out_of_stock" | "low_stock" | "inactive";
  stock: number | string;
  image: string;
}

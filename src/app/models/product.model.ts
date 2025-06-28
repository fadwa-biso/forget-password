export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  thumbnail: string;
  category: string;
  quantity: number;
  featured: boolean;
  ratings: any[];
  totalRating: number;
}

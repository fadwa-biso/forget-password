export interface CartItem {
  productId: {
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    sold: number;
    images: string[];
    thumbnail: string;
    totalRating: number;
    featured: boolean;
    ratings: any[];
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

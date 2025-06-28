export interface WishlistItem {
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
  createdAt: string;
  updatedAt: string;
}
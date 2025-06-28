import { CartItem } from "./cart-item.model";

export interface Cart {
  user: string;
  items: CartItem[];
  total: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id?: string;
  user?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
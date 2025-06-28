import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cartpage',
  standalone: false,
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalItems: number = 0;
  loading: boolean = true;

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
    next: (cart) => {
      this.cartItems = cart.items;
      this.calculateTotals();
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading cart:', err);
      this.loading = false;
    }
  });
}

  constructor(protected cartService: CartService) {}

  handleIncrement(productId: string) {
    const item = this.cartItems.find((item) => item.productId.id === productId);
    if (!item) return;
    const prevQuantity = item.quantity;
    const prevTotal = this.total;
    // Optimistic UI update
    item.quantity++;
    this.totalItems++;
    this.total += item.productId.price;
    this.cartService.increaseProductQuantity(productId).subscribe({
      next: (res: any) => {
        if (res && res.total !== undefined && res.totalItems !== undefined) {
          this.total = res.total;
          this.totalItems = res.totalItems;
        }
      },
      error: () => {
        // Revert optimistic update on error
        item.quantity = prevQuantity;
        this.totalItems--;
        this.total = prevTotal;
      },
    });
  }

  handleDecrement(productId: string) {
    const item = this.cartItems.find((item) => item.productId.id === productId);
    if (!item || item.quantity <= 1) {this.deleteItem(productId); return}; // Prevent decrement below 1
    const prevQuantity = item.quantity;
    const prevTotal = this.total;
    // Optimistic UI update
    item.quantity--;
    this.totalItems--;
    this.total -= item.productId.price;
    this.cartService.decreaseProductQuantity(productId).subscribe({
      next: (res: any) => {
        if (res && res.total !== undefined && res.totalItems !== undefined) {
          this.total = res.total;
          this.totalItems = res.totalItems;
        }
      },
      error: () => {
        // Revert optimistic update on error
        item.quantity = prevQuantity;
        this.totalItems++;
        this.total = prevTotal;
      },
    });
  }

  handleDelete(productId: string) {
    const index = this.cartItems.findIndex((item) => item.productId.id === productId);
    if (index === -1) return;
    const removedItem = this.cartItems[index];
    const prevCartItems = [...this.cartItems];
    const prevTotal = this.total;
    const prevTotalItems = this.totalItems;
    // Optimistic UI update
    this.cartItems.splice(index, 1);
    this.total -= removedItem.price * removedItem.quantity;
    this.totalItems -= removedItem.quantity;
    this.cartService.deleteItemFromCart(productId).subscribe({
      next: (res: any) => {
        if (res && res.total !== undefined && res.totalItems !== undefined) {
          this.total = res.total;
          this.totalItems = res.totalItems;
        }
      },
      error: () => {
        // Revert optimistic update on error
        this.cartItems = prevCartItems;
        this.total = prevTotal;
        this.totalItems = prevTotalItems;
      },
    });
  }


  deleteItem(productId: string): void {
    this.cartService.deleteItemFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.productId.id !== productId);
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
  clearCart() {
    this.cartService.deleteAllItems().subscribe({
      next: () => {
        this.cartItems = []; // Clear the local cart items array
        this.calculateTotals(); // Recalculate totals to update the UI
        console.log('Cart cleared successfully');
      },
      error: (err) => {
        console.error('Failed to clear cart:', err);
      }
    });
  }
}

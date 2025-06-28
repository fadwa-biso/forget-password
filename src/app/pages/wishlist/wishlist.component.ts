import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { WishlistItem } from '../../models/wishlist-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (wishlist) => {
        // this.wishlistItems = wishlist.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading wishlist:', err);
        this.error = 'Error loading wishlist';
        this.loading = false;
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(
          item => item.productId.id !== productId
        );
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
        alert('Failed to remove from wishlist');
      },
    });
  }

  addToCart(productId: string): void {
    this.cartService.increaseProductQuantity(productId).subscribe({
      next: () => {
        alert('Added to cart!');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Failed to add to cart');
      },
    });
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
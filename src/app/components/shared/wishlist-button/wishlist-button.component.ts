import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-wishlist-button',
  standalone: false,
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.css'],
})
export class WishlistButtonComponent implements OnInit {
  @Input() productId!: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  isInWishlist: boolean = false;
  loading: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.checkWishlistStatus();
    }
  }

  checkWishlistStatus(): void {
    this.wishlistService.isInWishlist(this.productId).subscribe({
      next: (response) => {
        this.isInWishlist = response.inWishlist;
      },
      error: (err) => {
        console.error('Error checking wishlist status:', err);
      },
    });
  }

  toggleWishlist(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Please login to add items to wishlist');
      return;
    }

    this.loading = true;

    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.productId).subscribe({
        next: () => {
          this.isInWishlist = false;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);
          this.loading = false;
        },
      });
    } else {
      this.wishlistService.addToWishlist(this.productId).subscribe({
        next: () => {
          this.isInWishlist = true;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error adding to wishlist:', err);
          this.loading = false;
        },
      });
    }
  }
}
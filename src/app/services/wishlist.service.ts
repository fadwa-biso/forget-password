import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WishlistItem } from '../models/wishlist-item.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistApiUrl = environment.apiUrl + '/wishlist';

  constructor(private http: HttpClient) {}

  // Add product to wishlist
  addToWishlist(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${this.wishlistApiUrl}/add`,
      { productId },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  }

  // Remove product from wishlist
  removeFromWishlist(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.request('delete', `${this.wishlistApiUrl}/remove`, {
      body: { productId },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Get user's wishlist
  getWishlist(): Observable<WishlistItem> {
    const token = localStorage.getItem('token');
    return this.http.get<WishlistItem>(`${this.wishlistApiUrl}/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Check if product is in wishlist
  isInWishlist(productId: string): Observable<{ inWishlist: boolean }> {
    const token = localStorage.getItem('token');
    return this.http.get<{ inWishlist: boolean }>(`${this.wishlistApiUrl}/check/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartApiUrl = environment.apiUrl + '/cart';
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      this.loadInitialCartCount();
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private loadInitialCartCount() {
    this.getCart().subscribe({
      error: () => { /* Silently handle error, cart count is already updated */ }
    });
  }

  private updateCartCount(cart: Cart | null) {
    if (!cart || !cart.items) {
      this.cartItemCount.next(0);
      return;
    }
    const total = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(total);
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartApiUrl}/me`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(cart => this.updateCartCount(cart)),
      catchError(err => {
        this.updateCartCount(null);
        return throwError(() => err);
      })
    );
  }

  increaseProductQuantity(productId: string): Observable<any> {
    return this.http.post(`${this.cartApiUrl}/increase`, { productId }, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  decreaseProductQuantity(productId: string): Observable<any> {
    return this.http.post(`${this.cartApiUrl}/decrease`, { productId }, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  deleteItemFromCart(productId: string): Observable<any> {
    return this.http.request('delete', `${this.cartApiUrl}/delete`, {
      body: { productId },
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  deleteAllItems(): Observable<any> {
    return this.http.delete(`${this.cartApiUrl}/deleteAll`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this.getCart().subscribe())  
    );
  }  

  clearCartOnLogout(): void {
    this.cartItemCount.next(0);
  }

  getTotal(): Observable<number> {
    return this.getCart().pipe(
      map((cart:Cart)=>{
        return cart.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      })
    )
}}

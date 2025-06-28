import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  // Create new order
  createOrder(orderData: Order): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${this.orderApiUrl}/create`,
      orderData,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  }

  // Get user's orders
  getUserOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Order[]>(`${this.orderApiUrl}/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Get order by ID
  getOrderById(orderId: string): Observable<Order> {
    const token = localStorage.getItem('token');
    return this.http.get<Order>(`${this.orderApiUrl}/${orderId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}
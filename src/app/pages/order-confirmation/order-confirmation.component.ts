import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId: string | undefined = params['orderId'];

      console.log('Received orderId:', orderId); // ✅ تساعد في التحقق من القيمة

      if (orderId) {
        this.fetchOrder(orderId);
      } else {
        this.loading = false;
        this.error = 'No order ID provided.';
      }
    });
  }

  fetchOrder(orderId: string): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrderById(orderId).subscribe({
      next: (order: Order) => {
        console.log('Fetched order:', order); // ✅ التحقق من شكل الطلب
        this.order = order;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching order:', err);
        this.error = 'Failed to fetch order details. Please try again later.';
        this.loading = false;
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }
}

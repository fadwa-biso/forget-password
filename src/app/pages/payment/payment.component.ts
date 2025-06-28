// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone:false
})
export class PaymentComponent implements OnInit {
  checkoutForm!: FormGroup;
  loading = true; // For skeleton loader
  isSubmitting = false; // For form submission
  orderPlaced = false;
  cartItems: any[] = [];
  total = 0;
  shippingCost = 10; // Example shipping cost
  finalTotal = 0;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Simulate loading for skeleton
    setTimeout(() => {
      this.checkoutForm = this.checkoutService.getForm();

      this.cartService.getCart().subscribe({
        next: (cart) => {
          this.cartItems = cart.items;
          this.calculateTotals();
        },
        error: (err) => {
          console.error('Error fetching cart', err);
        }
      });

      this.cartService.getTotal().subscribe({
        next: (total) => {
          this.total = total;
          this.calculateTotals();
        },
        error: (err) => {
          console.error('Error calculating total', err);
        }
      });
      this.loading = false; // Hide skeleton
    }, 1500);
  }

  calculateTotals(): void {
    this.finalTotal = this.total + this.shippingCost;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Order Placed:', {
        customer: this.checkoutForm.value,
        cart: this.cartItems,
      });

      this.cartService.deleteAllItems();
      this.isSubmitting = false;
      this.orderPlaced = true;
      this.router.navigate(['/orderconfirm']); // Navigate to success page
    }, 2000);
  }
}

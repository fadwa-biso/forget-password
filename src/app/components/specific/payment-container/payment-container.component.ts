import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment-container',
  standalone: false,
  templateUrl: './payment-container.component.html',
  styleUrl: './payment-container.component.css',
})
export class PaymentContainerComponent implements OnInit {
  totalAmount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getTotal().subscribe((total) => {
      this.totalAmount = total;
    });
  }

  handlePaymentSubmit(data: any) {
    console.log('Processing payment with:', data);
    alert('Payment successful! Order created. (Mock)');
  }
}

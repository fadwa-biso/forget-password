// shipping.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  standalone:false
})
export class ShippingComponent implements OnInit {
  checkoutForm!: FormGroup;
  loading = true; // Add loading flag

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.checkoutForm = this.checkoutService.getForm();
      this.loading = false; // Set loading to false after data is fetched
    }, 1500); // 1.5 second delay for demonstration
  }

  nextStep() {
    if (this.checkoutForm.valid) {
      this.router.navigate(['/checkout/payment']);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}

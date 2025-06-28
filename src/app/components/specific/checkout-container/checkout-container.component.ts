import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-checkout-container',
  standalone: false,
  templateUrl: './checkout-container.component.html',
  styleUrl: './checkout-container.component.css'
})
export class CheckoutContainerComponent {
  fawryRef: string | null = null;

  constructor(private paymentService: PaymentService) {}

  handleSubmit(formData: any) {
    this.paymentService.payWithFawry(formData).subscribe({
      next: (res: any) => this.fawryRef = res.fawryRefNumber,
      error: err => alert('Failed Payment' + err.error?.message || 'Error')
    });
  }
}

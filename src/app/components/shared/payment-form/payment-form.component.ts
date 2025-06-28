import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  standalone: false,
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent {
  @Input() totalAmount: number = 0;
  @Output() paymentSubmit = new EventEmitter<any>();

  PaymentData = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  submitForm() {
    this.paymentSubmit.emit(this.PaymentData);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  standalone:false,
})
export class CheckoutFormComponent {
  @Output() submitForm = new EventEmitter<any>();
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      email: [''],
      phone: [''],
      amount: [0],
      method: ['fawry']
    });
  }

  onSubmit() {
    this.submitForm.emit(this.checkoutForm.value);
  }
}

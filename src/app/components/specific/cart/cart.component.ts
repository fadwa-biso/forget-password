import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() items: CartItem[] = [];
  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  handleIncrement(productId: string) {
    this.increment.emit(productId);
  }

  handleDecrement(productId: string) {
    this.decrement.emit(productId);
  }

  handleDelete(productId: string) {
    this.delete.emit(productId);
  }

  get total(): number {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  handleIncrement() {
    this.increment.emit(this.item.productId.id);
  }

  handleDecrement() {
    this.decrement.emit();
  }

  handleDelete() {
    this.delete.emit(this.item.productId.id);
  }
}

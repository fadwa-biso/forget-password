import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartHelperService {
constructor(private cartService: CartService) { }

  addToCart(product: { id: string | null | undefined }): void {
    if (!product?.id) return;
    
    this.cartService.increaseProductQuantity(product.id).subscribe({
      next: () => {
        console.log('Added to cart!');
      },
      error: () => { 
        console.log('Failed to add to cart.');
      }
    });

    console.log('Added from details:', product);
  }
}

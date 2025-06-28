import { Component, Input } from '@angular/core';
import { Product} from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { Observable } from 'rxjs';
import { CartHelperService } from '../../../services/cart-helper.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product!: Product; // Using non-null assertion operator since product is expected to be provided by parent component(product-list)

  constructor(private cartHelpService: CartHelperService ,private wishlistService: WishlistService) { }


addToWishlist(productId: string): Observable<any> {
  return this.wishlistService.addToWishlist(productId);
}


addToCart(): void {
   if (!this.product) {
    console.log('Product is undefined!');
    return;
  }
  this.cartHelpService.addToCart(this.product);
}

}






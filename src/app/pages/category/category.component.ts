import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartHelperService } from '../../services/cart-helper.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  product?: Product;
  products: Product[] = [];
  categoryType: string = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartHelper: CartHelperService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categoryType = params['type'];

      this.productService
        .getProductsByCategoryName(this.categoryType)
        .subscribe((data) => {
          this.products = data;
        });
    });
  }
 addToCart(): void {
   if (!this.product) {
    console.log('Product is undefined!');
    return;
  }
  this.cartHelper.addToCart(this.product);
}
}

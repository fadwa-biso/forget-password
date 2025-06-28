import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartHelperService } from '../../services/cart-helper.service';
import { EventEmitter } from 'stream';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  relatedProducts: Product[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartHelper: CartHelperService,
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.productService.getProductById(id).subscribe({
          next: (data) => {
            this.product = data;
            this.loading = false;
            this.loadRelatedProducts();
          },
          error: (err) => {
            console.error('Error loading product:', err);
            this.loading = false;
          },
        });
      } else {
        console.error('No product ID found in route parameters');
        this.loading = false;
      }
    });
  }

  loadRelatedProducts(): void {
    if (this.product) {
      this.productService.getRelatedProducts(this.product.id).subscribe({
        next: (products) => {
          this.relatedProducts = products;
          this.loading=false;
        },
        error: (err) => {
          console.error('Error loading related products:', err);
        },
      });
    }else{
      this.loading=false;
    }
  }

addToCart(): void {
   if (!this.product) {
    console.log('Product is undefined!');
    return;
  }
  this.cartHelper.addToCart(this.product);
}
}

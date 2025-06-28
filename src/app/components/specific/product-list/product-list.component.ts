import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryName = params.get('categoryName');
      if (categoryName) {
        this.loadProductsByCategory(categoryName);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = 'Error loading products';
        this.loading = false;
      },
    });
  }

  loadProductsByCategory(categoryName: string): void {
    this.loading = true;
    this.productService.getProductsByCategoryName(categoryName).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = 'Error loading products for this category';
        this.loading = false;
      },
    });
  }
}

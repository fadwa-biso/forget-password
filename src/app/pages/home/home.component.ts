import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  // imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  product?: Product;
  products: Product[] = [];
  currentSlide = 0;
  totalSlides = 3;
  slideInterval: any;
  // product?: Product;
  featuredProducts: Product[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  categories = [
    {
      name: 'Chairs',
      slug: 'chairs',
      description: 'Elegant tables for memorable gatherings',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Bedroom',
      slug: 'bedroom',
      description: 'Luxurious bedroom furniture for restful nights',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Tables',
      slug: 'tables',
      description: 'Sophisticated seating and entertainment pieces',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  

features = [
{
  title: 'Handcrafted Excellence',
  description: 'Each piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations.',
  paths: [
    { d: 'M14 6L14 2L18 6L18 10L14 14L10 10L14 6Z', strokeWidth: 2 },
    { d: 'M10 10L4 16', strokeWidth: 2 },
    { d: 'M6 14L4 16', strokeWidth: 2 },
    { d: 'M16 12L8 20', strokeWidth: 2 }
  ]
}
,
  {
  title: 'Premium Materials',
  description: 'We source only the finest hardwoods and materials to ensure durability and beauty that lasts for generations.',
  paths: [
    { d: 'M20 20H4V4H20V20Z', strokeWidth: 2 },
    { d: 'M8 8H16', strokeWidth: 2 },
    { d: 'M8 12H16', strokeWidth: 2 },
    { d: 'M8 16H16', strokeWidth: 2 }
  ]
},
  {
    title: 'Timeless Design',
    description: 'Our Victorian-inspired designs blend classic elegance with modern functionality for today\'s sophisticated homes.',
    paths: [
      { d: 'M12 8V12L15 15', strokeWidth: 2 },
      { d: 'M12 2C6.477 2 2 6.477 2 12S6.477 22 12 22 22 17.523 22 12 17.523 2 12 2Z', strokeWidth: 2 }
    ]
  }
];


  ngOnInit() {
    this.startAutoSlide();
    this.loadFeaturedProducts();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }

  navigateToProducts() {
    // This would typically use Angular Router
    window.location.href = '/products';
  }

 loadFeaturedProducts(): void {

      this.productService.getFeaturedProducts().subscribe({

        next: (products) => {
          this.featuredProducts = products;
        },
        error: (err) => {
          console.error('Error loading related products:', err);
        },
      });

  }

  addToCart(product: Product): void {
  if (!product?.id) return;
  this.cartService.increaseProductQuantity(product.id).subscribe({
    next: () => {
      console.log('Added to cart!');
    },
    error: (err) => {
      console.error('Failed to add to cart:', err);
      console.log('Failed to add to cart.');
    }
  });
  console.log('Added from category:', product);
}
}

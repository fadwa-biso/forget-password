import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;
  searchTerm: string = '';
  username: string | null = null;
  loggedIn: boolean = false;
  isMenuOpen = false;
  showProductsDropdown = false;
  isCartOpen = false;
  searchQuery = '';

  constructor(private router: Router, private cartService: CartService, private authService: AuthService) {
    this.cartItemCount$ = this.cartService.cartItemCount$;
    this.updateAuthState();
  }

  ngOnInit(): void {
    
  }

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}


  ngDoCheck() {
    // Update login state on every change detection cycle
    this.updateAuthState();
  }

  updateAuthState() {
    this.loggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.cartService.clearCartOnLogout();
    this.updateAuthState();
    this.router.navigate(['/login']);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.cart-container') && !target.closest('.cart-dropdown')) {
      this.isCartOpen = false;
    }
  }
}
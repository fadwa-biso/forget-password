import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartpageComponent } from './pages/cartpage/cartpage.component';
import { ProductListComponent } from './components/specific/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { PaymentComponent } from './pages/payment/payment.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartpageComponent },
  { path: 'products/category/:categoryName', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'category/:type', component: CategoryComponent },
  { path: 'orderconfirm', component: OrderConfirmationComponent },
  { path: 'checkout/shipping',component: ShippingComponent},
  { path: 'checkout/payment', component: PaymentComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

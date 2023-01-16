import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ProductsComponent} from "./products/products.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AdminPortalComponent} from "./admin-portal/admin-portal.component";
import {ProductNewComponent} from "./admin-portal/product-new/product-new.component";
import {CartComponent} from "./cart/cart.component";
import {AuthGuard} from "./auth/auth.guard";
import {OrdersComponent} from "./orders/orders.component";
import {ProductOverviewComponent} from "./admin-portal/product-overview/product-overview.component";

const routes: Routes = [
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin', component: AdminPortalComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']}, children: [
      {path: '', component: ProductOverviewComponent},
      {path: 'new', component: ProductNewComponent},
      {path: 'edit', component: ProductNewComponent}
    ]
  },
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

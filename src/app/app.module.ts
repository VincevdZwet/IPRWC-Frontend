import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "./interceptors/http-interceptor.service";
import {RegisterComponent} from './auth/register/register.component';
import {ProductsComponent} from './products/products.component';
import {ProductComponent} from './products/product/product.component';
import {
  faCalendarAlt,
  faClock,
  faEnvelope,
  faEuroSign,
  faFilm,
  faHeart,
  faIdCard,
  faImage,
  faLock,
  faMoneyCheckAlt, faSearch,
  faShoppingCart,
  faTimes,
  faUser,
  faVenusMars
} from "@fortawesome/free-solid-svg-icons";
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {AdminPortalComponent} from './admin-portal/admin-portal.component';
import {DecimalPipe} from "@angular/common";
import {ProductNewComponent} from './admin-portal/product-new/product-new.component';
import {CartComponent} from './cart/cart.component';
import {CartListComponent} from './cart/cart-list/cart-list.component';
import {CheckoutModalComponent} from "./cart/checkout-modal/checkout-modal.component";
import {ErrorInterceptorService} from "./interceptors/error-interceptor.service";
import {ToastsContainer} from "./shared/toast/toasts-container.component";
import {OrdersComponent} from './orders/orders.component';
import {OrderComponent} from './orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProductComponent,
    ProductEditComponent,
    AdminPortalComponent,
    ProductNewComponent,
    CartComponent,
    CartListComponent,
    CheckoutModalComponent,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastsContainer
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faEnvelope,
      faLock,
      faUser,
      faIdCard,
      faCalendarAlt,
      faVenusMars,
      faHeart,
      faFilm,
      faClock,
      faImage,
      faShoppingCart,
      faTimes,
      faEuroSign,
      faMoneyCheckAlt,
      faSearch
    )
  }
}

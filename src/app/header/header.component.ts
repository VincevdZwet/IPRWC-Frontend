import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductModel} from "../shared/models/product.model";
import {CartService} from "../cart/cart.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated = false;
  cartProducts: ProductModel[] = [];

  constructor(private authService: AuthService, private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cart$.subscribe({
      next: (products: ProductModel[]) => {
        this.cartProducts = products;
      }
    });
  }

  ngOnDestroy() {

  }

  onLogout() {
    this.authService.logout();
  }
}

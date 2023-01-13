import {Component, OnInit} from "@angular/core";
import {ProductModel} from "../shared/models/product.model";
import {CartService} from "../cart/cart.service";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../shared/models/user.model";
import {LocalUserService} from "../shared/services/localUser.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  cartProducts: ProductModel[] = [];
  user: UserModel | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private localUserService: LocalUserService
  ) {
  }

  ngOnInit() {
    this.localUserService.isLoggedIn.subscribe({
      next: isLoggedIn => {
        if (isLoggedIn) {
          this.user = this.localUserService.localUser?.user;
        } else {
          this.user = undefined;
        }
      }
    });

    this.cartService.cart$.subscribe({
      next: (products: ProductModel[]) => {
        this.cartProducts = products;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}

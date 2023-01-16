import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {CartService} from "./cart/cart.service";
import {LocalUserService} from "./shared/services/localUser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('document:visibilitychange', ['$event'])
  unloadHandler() {
    if (this.localUserService.isLoggedIn.value) {
      this.cartService.saveCart();
    }
  }

  constructor(private authService: AuthService, private cartService: CartService, private localUserService: LocalUserService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.localUserService.isLoggedIn.subscribe({
      next: isLoggedIn => {
        if (isLoggedIn) {
          this.cartService.getCart();
        }
      }
    })
  }
}

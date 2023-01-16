import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {CartService} from "./cart/cart.service";
import {LocalUserService} from "./shared/services/localUser.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  @HostListener('document:visibilitychange', ['$event'])
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler() {
    if (this.localUserService.isLoggedIn.value) {
      this.cartService.saveCart();
    }
  }

  constructor(private authService: AuthService, private cartService: CartService, private localUserService: LocalUserService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.subscription = this.localUserService.isLoggedIn.subscribe({
        next: isLoggedIn => {
          if (isLoggedIn) {
            this.cartService.getCart();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

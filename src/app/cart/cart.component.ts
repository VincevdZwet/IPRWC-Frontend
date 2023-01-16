import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {ProductModel} from "../shared/models/product.model";
import {LocalUserService} from "../shared/services/localUser.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CheckoutModalComponent} from "./checkout-modal/checkout-modal.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  product: ProductModel = new ProductModel({title: 'title', releaseDate: new Date('2023-01-07'), duration: 420});
  cartProducts: ProductModel[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
              private localUserService: LocalUserService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.cartService.cart$.subscribe({
      next: (products: ProductModel[]) => {
        this.cartProducts = products;
        this.calcTotalPrice();
      }
    });
  }

  private calcTotalPrice() {
    this.totalPrice = 0;
    for (let product of this.cartProducts) {
      this.totalPrice += product.price != undefined ? product.price : 0;
    }
  }

  onCheckout() {
    if (!this.localUserService.isLoggedIn.value) {
      this.router.navigate(['/login']);
    } else {
      const modalRef = this.modalService.open(CheckoutModalComponent);
      modalRef.componentInstance.cartProducts = this.cartProducts;
      modalRef.componentInstance.totalPrice = this.totalPrice;
    }
  }
}

import {Component, Input} from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  @Input() cartProducts: ProductModel[] = [];

  constructor(private cartService: CartService) {
  }

  removeProduct(product: ProductModel) {
    this.cartService.removeFromCart(product);
  }
}

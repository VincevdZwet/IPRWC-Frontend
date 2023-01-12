import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {CartService} from "../../cart/cart.service";
import {map} from "rxjs/operators";
import {plainToInstance} from "class-transformer";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: ProductModel;
  AddedToCart: boolean = false;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    if (this.product){
      this.AddedToCart = this.cartService.isInCart(this.product);
      // console.log(this.cartService.isInCart(this.product))
    }
  }

  onAddToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.AddedToCart = true;
    }
  }

  onRemoveFromCart() {
    if (this.product) {
      this.cartService.removeFromCart(this.product);
      this.AddedToCart = false;
    }
  }
}

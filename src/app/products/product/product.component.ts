import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: ProductModel;
  AddedToCart: boolean = false;
  image: String | undefined;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    if (this.product) {
      this.AddedToCart = this.cartService.isInCart(this.product);
      this.image = this.product.imageUrl;
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

  setPlaceholderImg() {
    this.image = "https://via.placeholder.com/164x244?text=404 Image";
  }
}


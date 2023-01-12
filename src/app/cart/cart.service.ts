import {Injectable} from "@angular/core";
import {ProductModel} from "../shared/models/product.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class CartService {
  public cart$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  public cart: ProductModel[] = [];

  constructor() {
  }

  public addToCart(product: ProductModel): void {
    this.cart.push(product);
    this.cart$.next(this.cart.slice());
  }

  public removeFromCart(product: ProductModel): void {
    const index = this.cart.indexOf(product, 0)
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.cart$.next(this.cart.slice());
  }

  public isInCart(product: ProductModel): boolean {
    return this.cart.some(cartProduct => cartProduct.id === product.id);
  }
}

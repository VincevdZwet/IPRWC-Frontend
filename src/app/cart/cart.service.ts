import {Injectable} from "@angular/core";
import {ProductModel} from "../shared/models/product.model";
import {BehaviorSubject, catchError} from "rxjs";
import {map} from "rxjs/operators";
import {plainToInstance} from "class-transformer";
import {ErrorHandlingService} from "../shared/services/error-handling.service";
import {HttpClient} from "@angular/common/http";
import {CartModel} from "../shared/models/cart.model";

@Injectable({providedIn: "root"})
export class CartService {
  public cart$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  public cart: ProductModel[] = [];

  constructor(private errorHandlingService: ErrorHandlingService, private http: HttpClient) {
  }

  public addToCart(product: ProductModel): void {
    this.cart.push(product);
    this.cart$.next(this.cart.slice());
  }

  public removeFromCart(product: ProductModel): void {
    this.cart.forEach(cartProduct => {
      if (cartProduct.id === product.id) {
        const index = this.cart.indexOf(cartProduct)
        this.cart.splice(index, 1);
      }
    });

    this.cart$.next(this.cart.slice());
    this.saveCart();
  }

  public isInCart(product: ProductModel): boolean {
    return this.cart.some(cartProduct => cartProduct.id === product.id);
  }

  public saveCart(): void {
    let cartToSave: CartModel = new CartModel();
    cartToSave.products = this.cart;
    console.log(cartToSave);
    this.http.put("/cart/", cartToSave)
      .pipe(catchError(this.errorHandlingService.handleError)).subscribe({
      next: () => {
        console.log("done")
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getCart() {
    this.http.get<CartModel>("/cart/all")
      .pipe(catchError(this.errorHandlingService.handleError),
        map(cart => plainToInstance(CartModel, cart as Object))
      ).subscribe({
      next: cart => {
        if (cart.products != undefined) {
          this.cart = cart.products;
          this.cart$.next(this.cart.slice());
        }
      }
    });
  }
}

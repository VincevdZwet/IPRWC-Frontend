import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {catchError} from "rxjs";
import {ProductModel} from "../models/product.model";
import {map} from "rxjs/operators";
import {plainToInstance} from "class-transformer";

@Injectable({providedIn: "root"})
export class ProductService {
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  addProduct(product: ProductModel) {
    this.http.put('/product/',
      product).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
      next: () => {
        console.log("done")
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getProducts() {
    return this.http.get<ProductModel[]>("/product/all")
      .pipe(catchError(this.errorHandlingService.handleError),
        map(products => plainToInstance(ProductModel, products as Object[])));
  }

  deleteProduct(id: String) {
    return this.http.delete('/product/' + id).pipe(catchError(this.errorHandlingService.handleError))
  }

  updateProduct(product: ProductModel) {
    this.http.post('/product/' + product.id,
      product
    ).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
      next: () => {
        console.log('done');
      }
    })
  }
}

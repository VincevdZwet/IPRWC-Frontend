import {Injectable} from "@angular/core";
import {catchError} from "rxjs";
import {OrderModel} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({providedIn: "root"})
export class CheckoutService {

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  addOrder(order: OrderModel) {
    console.log(order);
    // this.http.put('/product/',
    //   order).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
    //   next: () => {
    //     console.log("done")
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // })
  }

}

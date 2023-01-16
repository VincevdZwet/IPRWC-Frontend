import {Injectable} from "@angular/core";
import {catchError} from "rxjs";
import {OrderModel} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {map} from "rxjs/operators";
import {plainToInstance} from "class-transformer";

@Injectable({providedIn: "root"})
export class OrderService {

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getOrders(){
    return this.http.get<OrderModel[]>("/order/all")
      .pipe(catchError(this.errorHandlingService.handleError),
        map(orders => plainToInstance(OrderModel, orders as Object[])));
  }

  createOrder(order: OrderModel) {
    console.log(order);
    this.http.put('/order/',
      order).pipe(catchError(this.errorHandlingService.handleError)).subscribe({
      next: () => {
        console.log("done order")
      },
      error: err => {
        console.log(err);
      }
    })
  }

}

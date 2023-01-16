import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderModel} from "../shared/models/order.model";
import {OrderService} from "../shared/services/order.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: OrderModel[] = [];
  ordersSubscription!: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.ordersSubscription = this.orderService.getOrders().subscribe({
        next: orders => {
          this.orders = orders;
        }
      }
    );
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}

import {Component, Input} from '@angular/core';
import {OrderModel} from "../../shared/models/order.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() order?: OrderModel;
}

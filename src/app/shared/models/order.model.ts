import {Type} from "class-transformer";
import {UserModel} from "./user.model";
import {OrderProductsModel} from "./orderProducts.model";

export class OrderModel {
  id!: string;
  products: String[] | undefined;
  @Type(() => Date)
  createdAt: Date | undefined;
  emailSentTo: string | undefined;
  orderProducts: OrderProductsModel[] | undefined;
  invoiceNumber: number | undefined;
  bank: string | undefined;
  totalPrice: number | undefined;
  user: UserModel | undefined;

  constructor(init?: Partial<OrderModel>) {
    Object.assign(this, init);
  }
}

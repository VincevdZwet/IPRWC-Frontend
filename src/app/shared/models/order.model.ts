import {Type} from "class-transformer";
import {ProductModel} from "./product.model";
import {UserModel} from "./user.model";

export class OrderModel {
  id!: string;
  products: ProductModel[] | undefined;
  @Type(() => Date)
  createdAt: Date | undefined;
  invoiceNumber: number | undefined;
  bank: string | undefined;
  totalPrice: number | undefined;
  user: UserModel | undefined;

  constructor(init?: Partial<OrderModel>) {
    Object.assign(this, init);
  }
}

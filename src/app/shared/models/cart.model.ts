import {UserModel} from "./user.model";
import {ProductModel} from "./product.model";

export class CartModel {
  id!: string;
  user: UserModel | undefined;
  products: ProductModel[] | undefined;

  constructor(init?: Partial<CartModel>) {
    Object.assign(this, init);
  }
}

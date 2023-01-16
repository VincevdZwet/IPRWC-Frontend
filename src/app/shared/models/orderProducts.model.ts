import {ProductModel} from "./product.model";

export class OrderProductsModel {
  id!: string;
  order: string | undefined;
  product: ProductModel[] | undefined;
  productName: string | undefined;
  productPrice: number | undefined;

  constructor(init?: Partial<OrderProductsModel>) {
    Object.assign(this, init);
  }
}

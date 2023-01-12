import {Type} from "class-transformer";

export class ProductModel {
  id!: string;
  title: string | undefined;
  @Type(() => Date)
  releaseDate: Date | undefined;
  duration: number | undefined;
  imageUrl: string | undefined;
  price: number | undefined;

  constructor(init?: Partial<ProductModel>) {
    Object.assign(this, init);
  }
}

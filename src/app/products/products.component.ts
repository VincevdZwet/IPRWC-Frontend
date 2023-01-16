import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from "../shared/models/product.model";
import {ProductService} from "../shared/services/product.service";
import {Subscription} from "rxjs";
import {plainToInstance} from "class-transformer";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  productsSubscription!: Subscription;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productsSubscription = this.productService.getProducts().subscribe({
        next: products => {
          this.products = plainToInstance(ProductModel, products);
        }
      }
    );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}

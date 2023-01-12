import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductModel} from "../../shared/models/product.model";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../shared/services/product.service";
import {plainToInstance} from "class-transformer";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  productForm!: FormGroup;
  error: string | undefined;
  productToBeEdited: ProductModel | undefined;

  //Dates for the datepicker
  today = new Date();
  minDate = {year: this.today.getFullYear() - 100, month: 1, day: 1};
  maxDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()};

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    if (history.state.product) {
      this.productToBeEdited = history.state.product;
    }

    this.initProductForm();
  }

  private initProductForm() {
    let productTitle: string | undefined = '';
    let productReleaseDate: NgbDateStruct = {day: 0, month: 0, year: 0};
    let productDuration: number | undefined = undefined;
    let productImageUrl: string | undefined = '';
    let productPrice: number | undefined = undefined;

    if (this.productToBeEdited != null) {
      const product = this.productToBeEdited;
      productTitle = product.title;
      if (product.releaseDate != null) {
        productReleaseDate = ({
          year: product.releaseDate.getUTCFullYear(),
          month: product.releaseDate.getMonth() + 1,
          day: product.releaseDate.getDate()
        } as NgbDateStruct);
      }
      productDuration = product.duration;
      productImageUrl = product.imageUrl;
      productPrice = product.price;
    }

    this.productForm = new FormGroup({
      'title': new FormControl(productTitle, Validators.required),
      'releaseDate': new FormControl(productReleaseDate, Validators.required),
      'duration': new FormControl(productDuration, Validators.required),
      'imageUrl': new FormControl(productImageUrl, Validators.required),
      'price': new FormControl(productPrice, Validators.required)
    });
  }

  onAdd() {
    let newProduct = plainToInstance(ProductModel, (this.productForm.value as Object))

    //Convert NgbDateStruct to Date
    const releaseDate = (this.productForm.get('releaseDate')?.value as NgbDateStruct)
    newProduct.releaseDate = new Date(releaseDate.year + "-" + releaseDate.month + "-" + releaseDate.day);

    if (this.productToBeEdited){
      newProduct.id = this.productToBeEdited.id;
      this.productService.updateProduct(newProduct);
    }else {
      this.productService.addProduct(newProduct);
    }
  }
}

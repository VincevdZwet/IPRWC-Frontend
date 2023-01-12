import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModel} from "../../shared/models/product.model";
import {CheckoutService} from "../../shared/services/checkout.service";
import {OrderModel} from "../../shared/models/order.model";

@Component({
  selector: 'app-checkout-modal',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Checkout</h4>
          <button type="button" class="btn-close" aria-label="Close"
                  (click)="activeModal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
          <div class="card mb-3">
              <div class="card-header">
                  <h4 class="mb-0">Your products</h4>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                      <div class="row">
                          <div class="col-9"><strong>Title</strong></div>
                          <div class="col-3"><strong>Price</strong></div>
                      </div>
                  </li>
                  <li class="list-group-item" *ngFor="let product of cartProducts">
                      <div class="row">
                          <div class="col-9"><span>{{ product.title }}</span></div>
                          <div class="col-3"><span>{{ product.price | number }}</span></div>
                      </div>
                  </li>
              </ul>
          </div>
          <form [formGroup]="checkoutForm">
              <div class="input-group mb-3">
                  <span class="input-group-text"><fa-icon icon="envelope" class="fa-fw"></fa-icon></span>
                  <input type="email" autocomplete="username" class="form-control" placeholder="Email" name="email"
                         formControlName="email" aria-describedby="emailHelp">
                  <div id="emailHelp" class="form-text w-100">
                      <strong>We will send your products to this email!</strong>
                  </div>
              </div>
              <div class="input-group mb-3">
                  <span class="input-group-text"><fa-icon icon="money-check-alt" class="fa-fw"></fa-icon></span>
                  <select class="form-select" formControlName="bank">
                      <option [selected]="true" disabled hidden>Choose your bank to pay with</option>
                      <option value="ING">ING Bank</option>
                      <option value="RABO">Rabobank</option>
                      <option value="ABN">ABN AMRO</option>
                      <option value="SNS">SNS Bank</option>
                      <option value="KNAB">Knab Bank</option>
                  </select>
              </div>
          </form>
      </div>
      <div class="modal-footer d-flex align-items-center justify-content-between">
          <h5>Your total price is: &euro;{{totalPrice}}</h5>
          <button class="btn-primary btn" type="submit"
                  [disabled]="!checkoutForm.valid" (click)="onCheckout()">Order and pay
          </button>
      </div>
  `
})
export class CheckoutModalComponent implements OnInit{
  checkoutForm!: FormGroup;
  cartProducts: ProductModel[] = [];
  totalPrice: number = 0;

  constructor(public activeModal: NgbActiveModal, private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
      'bank': new FormControl(null, Validators.required)
    })
  }


  onCheckout() {
    let order: OrderModel = this.checkoutForm.value;
    order.totalPrice = this.totalPrice;
    order.products = this.cartProducts;
    console.log(order)
    this.checkoutService.addOrder(order);
  }
}

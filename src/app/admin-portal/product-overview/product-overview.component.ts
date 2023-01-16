import {Component, PipeTransform} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProductModel} from "../../shared/models/product.model";
import {BehaviorSubject} from "rxjs";
import {DecimalPipe} from "@angular/common";
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../shared/toast/toast-service";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {
  filter = new FormControl('', {nonNullable: true});
  products: ProductModel[] = [];
  filteredProducts$ = new BehaviorSubject<ProductModel[]>([]);

  constructor(private pipe: DecimalPipe, private productService: ProductService, private router: Router, private toastService: ToastService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getProducts();

    //Provides filtered array of ProductModels
    this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.match(text, this.pipe))
    ).subscribe({
      next: value => {
        this.filteredProducts$.next(value);
      }
    });
  }

  public trackItem(index: number, product: ProductModel) {
    return product.title
  }

  getProducts() {
    this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts$.next(products);
        }
      }
    );
  }

  match(text: string, pipe: PipeTransform): ProductModel[] {
    return this.products.filter((product) => {
      const term = text.toLowerCase();
      return (
        product.title?.toLowerCase().includes(term) ||
        pipe.transform(product.duration).includes(term) ||
        pipe.transform(product.price).includes(term) ||
        product.releaseDate?.toDateString().toLowerCase().includes(term)
      );
    })
  }

  onDelete(id: string) {
    this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.getProducts();
          this.toastService.show('Product successful deleted.', {classname: 'bg-success text-light', delay: 3000});
        },
        error: errorMessage => {
          this.toastService.show(errorMessage, {classname: 'bg-danger text-light', delay: 3000});
        }
      }
    )
  }

  onEdit(product: ProductModel) {
    this.router.navigate(['edit'], {state: {product: product}, relativeTo: this.route});
  }
}


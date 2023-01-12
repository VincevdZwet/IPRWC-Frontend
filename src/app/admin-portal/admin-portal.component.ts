import {Component, OnInit, PipeTransform} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DecimalPipe} from "@angular/common";
import {map, startWith} from "rxjs/operators";
import {ProductService} from "../shared/services/product.service";
import {ProductModel} from "../shared/models/product.model";
import {Router} from "@angular/router";
import {state} from "@angular/animations";

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss'],
})
export class AdminPortalComponent implements OnInit {
  filter = new FormControl('', {nonNullable: true});
  products: ProductModel[] = [];
  filteredProducts$ = new BehaviorSubject<ProductModel[]>([]);

  constructor(private pipe: DecimalPipe, private productService: ProductService, private router: Router) {
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
        product.releaseDate?.toDateString().toLowerCase().includes(term)
      );
    })
  }

  onDelete(id: string) {
    this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.getProducts();
        }
      }
    )
  }

  onEdit(product: ProductModel) {
    this.router.navigate(['/edit'], {state: {product: product}});
  }
}
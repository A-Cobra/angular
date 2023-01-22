import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { Product } from 'src/app/models/product/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  currentProduct!: Product;
  currentSlug!: string;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.productsService.getProduct('justins');
    console.log('Product Details');
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        this.currentSlug = urlData?.['productSlug'];
        this.productsService.getProduct(this.currentSlug).subscribe({
          next: (product: Product) => {
            this.currentProduct = product;
          },
          error: (error: Response) => {
            console.log('Error');
            console.log(error);
            // redirect to home page
          },
        });
      });
  }
  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe;
  }
}

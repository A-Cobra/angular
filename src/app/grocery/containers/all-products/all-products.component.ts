import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.interface';
import { Product } from 'src/app/models/product.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  categories: ProductCategory[] = [];
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (productsArray: Product[]) => {
        console.log(productsArray);
        this.products = productsArray;
      },
    });
    this.categoriesService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        console.log(this.categories);
      },
    });
    console.log('Products COMPONENT');
  }
}

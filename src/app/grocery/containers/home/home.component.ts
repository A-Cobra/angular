import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    // this.productsService.getProducts().subscribe({
    //   next: (productsList: Product[]) => {
    //     console.log(productsList);
    //   },
    // });
    console.log('HOME COMPONENT');
  }
}

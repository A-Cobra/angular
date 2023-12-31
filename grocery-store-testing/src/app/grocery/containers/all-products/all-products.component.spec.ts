import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsComponent } from './all-products.component';

import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product.interface';
import { DebugElement } from '@angular/core';
import { ProductCategory } from 'src/app/models/product/product-category.interface';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CategoriesService } from '../../services/categories.service';
import { NotificationsService } from '../../services/notifications.service';
// import { CartService } from '../../services/cart/cart.service';
import { CartService } from 'src/app/grocery/services/cart/cart.service';

describe('AllProductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;
  let debugElement: DebugElement;
  let mockProductsService!: {
    getProducts: () => Observable<Product[]>;
    getProductsWithSearchingTools: () => Observable<Product[]>;
  };
  let mockCategoriesService!: {
    getCategories: () => Observable<ProductCategory[]>;
  };
  let mockCartService!: {
    addItemToCart: () => Observable<CartItem[]>;
  };
  let mockNotificationsService!: {
    notifyQueryError: () => void;
    notifySuccessfulCartAddition: () => void;
    notifyItemAlreadyInCart: () => void;
    notifyNotEnoughStock: () => void;
  };

  beforeEach(async () => {
    mockProductsService = {
      getProducts: jest.fn(),
      getProductsWithSearchingTools: jest.fn(),
    };
    mockCategoriesService = {
      getCategories: jest.fn(),
    };
    mockCartService = {
      addItemToCart: jest.fn(),
    };
    mockNotificationsService = {
      notifyQueryError: jest.fn(),
      notifySuccessfulCartAddition: jest.fn(),
      notifyItemAlreadyInCart: jest.fn(),
      notifyNotEnoughStock: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AllProductsComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: CartService, useValue: mockCartService },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    // jest.spyOn(mockProductsService, "getProducts").mockReturnValue();
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
});

import { ProductVisualizerComponent } from './product-visualizer.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { defaultProduct } from './test-models/default-product';
import { NotificationsService } from '../../services/notifications.service';
import { By } from '@angular/platform-browser';

describe('ProductVisualizerComponent ', () => {
  let component: ProductVisualizerComponent;
  let fixture: ComponentFixture<ProductVisualizerComponent>;
  let debugElement: DebugElement;
  // let mockLoginService!: // : any;
  // {
  //   checkLogin: () => Observable<boolean>;
  // };
  // let mockNotificationsService!: {
  //   notifyLoginSuccess: () => void;
  //   notifyLoginFailure: () => void;
  //   notifyWrongFormData: () => void;
  // };
  let mockNotificationsService!: {
    notifyNonNegativeQuantity: () => void;
    notifyNotEnoughStock: () => void;
  };

  beforeEach(async () => {
    mockNotificationsService = {
      notifyNonNegativeQuantity: jest.fn(),
      notifyNotEnoughStock: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ProductVisualizerComponent],
      providers: [
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductVisualizerComponent);
    component = fixture.componentInstance;
    component.shortenedContent = false;
    //We suppose that the input was passed
    component.product = defaultProduct;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  describe('Typescript Tests', () => {
    test('The ProductVisualizerComponent must be initialized', () => {
      expect(component).toBeTruthy();
    });
    test('the input is successfully passed', () => {
      expect(component.product).not.toBe(null);
    });
    test('that the notifications service informs that the quantity can not be less than 0', () => {
      jest.spyOn(mockNotificationsService, 'notifyNonNegativeQuantity');
      const cartAdditionButton = debugElement.query(
        By.css('.cart-addition')
      ).nativeElement;
      // Setting a negative number
      component.quantity.nativeElement.value = -3;
      cartAdditionButton.click();
      // Setting a text as input
      component.quantity.nativeElement.value = 'affsaf';
      cartAdditionButton.click();
      expect(
        mockNotificationsService.notifyNonNegativeQuantity
      ).toHaveBeenCalledTimes(2);
    });
    test("that the notifications service informs that there isn't enough stock", () => {
      jest.spyOn(mockNotificationsService, 'notifyNotEnoughStock');
      const cartAdditionButton = debugElement.query(
        By.css('.cart-addition')
      ).nativeElement;
      // We know that the product's stock is 978
      component.quantity.nativeElement.value = 979;
      cartAdditionButton.click();
      expect(
        mockNotificationsService.notifyNotEnoughStock
      ).toHaveBeenCalledTimes(1);
    });
    test('that the updateStockClass function gets called on input change', () => {
      const cartQuantityInput = debugElement.query(By.css('input'));
      jest.spyOn(component, 'updateStockClass');
      // We simulate an input change
      cartQuantityInput.triggerEventHandler('change', 12);
      expect(component.updateStockClass).toHaveBeenCalledTimes(1);
    });
  });

  describe('UI or HTML Tests', () => {
    test('the main container must not be empty', () => {
      expect(debugElement.query(By.css('.grid-wrapper'))).not.toBe(null);
    });
    test('the keywords for name, description, category, price, and stock are displayed', () => {
      const tests: RegExp[] = [
        /name/i,
        /description/i,
        /category/i,
        /price/i,
        /stock/i,
      ];
      //We want to see if all the keywords get rendered when the content isn't shortened
      const gridWrapper = debugElement.query(By.css('.grid-wrapper'));
      const gridWrapperContent = gridWrapper.nativeElement.textContent;
      const testsResult: boolean = tests.every((regexPattern: RegExp) => {
        return regexPattern.test(gridWrapperContent);
      });
      expect(testsResult).toBe(true);
    });
    test('the actual values for name, description, category, price, and stock are displayed', () => {
      const notFound = '-.1235,sdasfqhr{+v*´';
      const tests: (string | number)[] = [
        component.product.name,
        component.product.description,
        component.product.category?.name ?? notFound,
        component.product.master?.price ?? notFound,
        component.product.master?.stock ?? 0,
      ];
      const gridWrapper = debugElement.query(By.css('.grid-wrapper'));
      const gridWrapperContent = gridWrapper.nativeElement.textContent;
      const testsResult = tests.every(
        (value: string | number, index: number) => {
          if (typeof value === 'number') {
            return gridWrapperContent.match(new RegExp(value.toFixed(0), 'i'));
          }
          if (index === 3) {
            const [integer, decimal] = value.split('.');
            const trimmedNumber = `${integer}.${decimal.slice(0, 2)}`;
            return gridWrapperContent.match(new RegExp(trimmedNumber, 'i'));
          }
          return gridWrapperContent.match(new RegExp(value, 'i'));
        }
      );

      expect(testsResult).toBe(true);
    });
    test('that the eventEmitter gets called', () => {
      // Setting a normal quantity
      component.quantity.nativeElement.value = 5;
      jest.spyOn(component.cartAddition, 'emit');
      const cartAdditionButton = debugElement.query(
        By.css('.cart-addition')
      ).nativeElement;
      // We purposely click the button twice
      cartAdditionButton.click();
      cartAdditionButton.click();
      expect(component.cartAddition.emit).toHaveBeenCalledTimes(2);
    });
  });
});

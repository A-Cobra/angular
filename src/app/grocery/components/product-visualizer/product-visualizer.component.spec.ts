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
    // mockLoginService = {
    //   checkLogin: jest.fn(),
    //   // checkLogin: () => of(false),
    // };
    mockNotificationsService = {
      notifyNonNegativeQuantity: jest.fn(),
      notifyNotEnoughStock: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        // ReactiveFormsModule,
        // MatSnackBarModule,
        // BrowserAnimationsModule,
      ],
      declarations: [ProductVisualizerComponent],
      providers: [
        // { provide: LoginService, useValue: mockLoginService },
        { provide: NotificationsService, useValue: mockNotificationsService },
        // { provide: NotificationsService, provider: NotificationsService },
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
      const cartQuantityInput = debugElement.query(
        By.css('.cart-quantity-input')
      ).nativeElement;
      jest.spyOn(component, 'updateStockClass');
      // We simulate an input
      // component.updateStockClass();
      cartQuantityInput.value = 15;
      cartQuantityInput.click();
      cartQuantityInput.nativeElement.triggerEventHandler('input', 1);
      // cartQuantityInput.nativeElement.keyup('5');
      // component.quantity.nativeElement.value;
      expect(component.updateStockClass).toHaveBeenCalledTimes(1);
      console.log('component.quantity.nativeElement.value');
      console.log(component.quantity.nativeElement.value);
    });
  });

  describe('UI or HTML Tests', () => {
    test('the main container must not be empty', () => {
      expect(debugElement.query(By.css('.grid-wrapper'))).not.toBe(null);
    });
    test('the information for name, description, category, like, dislike, price is displayed', () => {
      //We want to see if all the content gets rendered when the content isn't shortened
      // component.shortenedContent = false;
      const gridWrapper = debugElement.query(
        By.css('.grid-wrapper')
      ).nativeElement;
      const h3Array = gridWrapper.querySelectorAll('h3');
      const gridWrapperContent = gridWrapper.textContent;
      // Checks That Name is rendered
      expect(gridWrapperContent).toMatch(/(name)/i);
      console.log('gridWrapperContent');
      console.log(gridWrapperContent);
      console.log('h3Array');
      console.log(h3Array.length);
      console.log('gridWrapper');
      console.log(gridWrapper);
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

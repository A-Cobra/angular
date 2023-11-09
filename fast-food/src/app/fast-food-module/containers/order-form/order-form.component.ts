import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';
import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { SingleSelectionComponent } from '../../components/single-selection/single-selection.component';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { MultipleSelectionComponent } from '../../components/multiple-selection/multiple-selection.component';
import { FormTextComponent } from '../../components/form-text/form-text.component';
import { TextareaEvent } from '../../models/textarea-event.type';
import { SingleSelectionEvent } from '../../models/single-selection-event.type';
import { MultipleSelectionEvent } from '../../models/multiple-selection-event.type';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements AfterViewInit {
  @Input()
  cartForm: boolean = false;
  id: number = 0;
  totalPrice: number = 0;
  @Input()
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  @ViewChild('formControlsDisplay', { read: ViewContainerRef })
  formControlsDisplay!: ViewContainerRef;
  @Output()
  removeFromCart: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  saveCartChanges: EventEmitter<string> = new EventEmitter<string>();
  form = new FormGroup({
    dynamicComponents: new FormArray([
      new FormControl('1', { nonNullable: true }),
      new FormControl('2', { nonNullable: true }),
    ]),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private cartService: CartService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngAfterViewInit(): void {
    this.recalculatePrice();
    this.fillFormControls();
    this.changeDetector.detectChanges();
  }

  fillFormControls(): void {
    this.currentMenuSelection.customizableOptions.forEach(
      (customizableOption: CustomizableOption, index: number) => {
        this.addDynamicControl(customizableOption, index);
      }
    );
  }

  addDynamicControl(customizableOption: CustomizableOption, id: number): void {
    if (customizableOption.type === 'single-select') {
      const singleSelectionComponent = this.formControlsDisplay.createComponent(
        SingleSelectionComponent
      );
      singleSelectionComponent.instance.customizableOption = customizableOption;
      singleSelectionComponent.instance.id = id;
      singleSelectionComponent.instance.parentForm = this.form;
      singleSelectionComponent.instance.singleSelectionChange.subscribe({
        next: (singleSelectionEvent: SingleSelectionEvent) => {
          this.onSingleSelectionChange(singleSelectionEvent);
          this.recalculatePrice();
        },
      });
    } else if (customizableOption.type === 'multi-select') {
      const multipleSelectionComponent =
        this.formControlsDisplay.createComponent(MultipleSelectionComponent);
      multipleSelectionComponent.instance.id = id;
      multipleSelectionComponent.instance.customizableOption =
        customizableOption;
      multipleSelectionComponent.instance.multipleSelectionChange.subscribe({
        next: () => {
          this.recalculatePrice();
        },
      });
    } else if (customizableOption.type === 'text') {
      const textComponent =
        this.formControlsDisplay.createComponent(FormTextComponent);
      textComponent.instance.customizableOption = customizableOption;
      textComponent.instance.id = id;
      textComponent.instance.textareaChange.subscribe({
        next: (textareaEvent: TextareaEvent) => {
          this.onTextareaChanges(textareaEvent);
          this.recalculatePrice();
        },
      });
    }
  }

  onTextareaChanges(textareaEvent: TextareaEvent): void {
    this.currentMenuSelection.customizableOptions[textareaEvent.id].value =
      textareaEvent.value;
  }

  onSingleSelectionChange(singleSelectionChange: SingleSelectionEvent): void {
    this.currentMenuSelection.customizableOptions[singleSelectionChange.id] =
      singleSelectionChange.customizableOption;
  }

  onMultipleSelectionChanges(multipleSelectionChange: MultipleSelectionEvent) {
    this.currentMenuSelection.customizableOptions[
      multipleSelectionChange.id
    ].options = multipleSelectionChange.options;
  }

  onAddClick() {
    this.cartService.addItemToTheCart(this.currentMenuSelection).subscribe({
      next: (menuItem: MenuItem) => {
        this.notificationsService.notifyItemAddedToCart();
      },
    });
  }

  recalculatePrice() {
    let recalculatedPrice = this.currentMenuSelection.basePrice;
    for (const customizableOption of this.currentMenuSelection
      .customizableOptions) {
      if (customizableOption?.options) {
        for (const option of customizableOption?.options) {
          if (option.selected) {
            recalculatedPrice += option.extraPrice ?? 0;
          }
        }
      }
    }
    this.totalPrice = recalculatedPrice;
  }

  onRemoveFromCart() {
    this.cartService
      .removeItemFormTheCart(this.currentMenuSelection.id)
      .subscribe({
        next: (menuItem: MenuItem) => {
          this.simulateRedirectionToCart();
          this.notificationsService.notifyItemRemovedFromTheCart();
        },
      });
  }

  onSaveChanges() {
    this.cartService.updateCartItem(this.currentMenuSelection).subscribe({
      next: (menuItem: MenuItem) => {
        this.simulateRedirectionToCart();
        this.notificationsService.notifyItemUpdatedCorrectly();
      },
    });
  }

  simulateRedirectionToCart() {
    this.router.navigate([
      'fast-food',
      {
        outlets: {
          'menu-selection': ['hamburger-combos'],
          'menu-details': ['selection'],
        },
      },
    ]);
    setTimeout(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['cart'],
            'menu-details': ['cart-selection'],
          },
        },
      ]);
    });
  }
}

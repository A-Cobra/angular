import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
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
import { formatWithCursor } from 'prettier';
import { SingleSelectionComponent } from '../../components/single-selection/single-selection.component';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { MultipleSelectionComponent } from '../../components/multiple-selection/multiple-selection.component';
import { FormTextComponent } from '../../components/form-text/form-text.component';
import { TextareaEvent } from '../../models/textarea-event.type';
import { SingleSelectionEvent } from '../../models/sigle-selection-event.type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
// implements OnInit, AfterContentInit, AfterViewInit
export class OrderFormComponent implements AfterViewInit {
  id: number = 0;
  @Input()
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  @ViewChild('formControlsDisplay', { read: ViewContainerRef })
  formControlsDisplay!: ViewContainerRef;
  form = new FormGroup({
    dynamicComponents: new FormArray([
      new FormControl('1', { nonNullable: true }),
      new FormControl('2', { nonNullable: true }),
    ]),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.fillFormControls();
    this.changeDetector.detectChanges();
  }

  fillFormControls(): void {
    console.log('Creating components');
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
      // DOESN'T WORK
      singleSelectionComponent.instance.customizableOption = customizableOption;
      // DOESN'T WORK
      singleSelectionComponent.instance.id = id;
      singleSelectionComponent.instance.parentForm = this.form;
      singleSelectionComponent.instance.singleSelectionChange.subscribe({
        next: (singleSelectionEvent: SingleSelectionEvent) => {
          // this.onTextareaChanges(textareaEvent);
        },
      });
    }
    // WORKS
    else if (customizableOption.type === 'multi-select') {
      const multipleSelectionComponent =
        this.formControlsDisplay.createComponent(MultipleSelectionComponent);
      multipleSelectionComponent.instance.id = id;
      multipleSelectionComponent.instance.customizableOption =
        customizableOption;
      // Attributes not set yet
    } else if (customizableOption.type === 'text') {
      const textComponent =
        this.formControlsDisplay.createComponent(FormTextComponent);
      textComponent.instance.customizableOption = customizableOption;
      textComponent.instance.id = id;
      textComponent.instance.textareaChange.subscribe({
        next: (textareaEvent: TextareaEvent) => {
          this.onTextareaChanges(textareaEvent);
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
}

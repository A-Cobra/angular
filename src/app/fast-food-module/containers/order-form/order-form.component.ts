import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
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

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
// implements OnInit, AfterContentInit, AfterViewInit
export class OrderFormComponent implements OnInit, AfterViewInit {
  id: number = 0;
  @Input()
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };

  @ViewChild('formControlsDisplay', { read: ViewContainerRef })
  formControlsDisplay!: ViewContainerRef;

  form = new FormArray([
    new FormControl('1', { nonNullable: true }),
    new FormControl('2', { nonNullable: true }),
    new FormControl('3', { nonNullable: true }),
  ]);

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    console.log(this.form.value);
    // this.addDynamicControl('single-select');
    this.form.push(new FormControl('4', { nonNullable: true }));
  }

  // ngAfterContentInit(): void {
  //   // this.form.push(new FormControl('4', { nonNullable: true }));
  //   // this.formControlsDisplay.createComponent(SingleSelectionComponent);
  //   console.log('object');
  // }

  ngAfterViewInit(): void {
    // this.form.push(new FormControl('4', { nonNullable: true }));
    // this.formControlsDisplay.createComponent(SingleSelectionComponent);
    // this.addDynamicControl('single-select');

    // this.addDynamicControl('single-select');
    // this.addDynamicControl('single-select');
    this.fillFormControls();
  }

  // get controls(): AbstractControl<string[]> {
  //   // return this.form.get('dynamicControls');
  //   return this.form.get('dynamicControls') as AbstractControl<string[]>;
  // }
  addDynamicControl(customizableOption: CustomizableOption): void {
    if (customizableOption.type === 'single-select') {
      this.formControlsDisplay.createComponent(SingleSelectionComponent);
    } else if (customizableOption.type === 'multi-select') {
      this.formControlsDisplay.createComponent(MultipleSelectionComponent);
    } else if (customizableOption.type === 'text') {
      this.formControlsDisplay.createComponent(FormTextComponent);
    }
  }

  fillFormControls(): void {
    console.log('Creating components');
    this.currentMenuSelection.customizableOptions.forEach(
      (customizableOption: CustomizableOption) => {
        this.addDynamicControl(customizableOption);
      }
    );
  }
}

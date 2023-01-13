import { Component, Input, OnInit } from '@angular/core';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';
import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  id: number = 0;
  @Input()
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  form = this.formBuilder.array([[]]);
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    console.log(this.form.value);
  }
}

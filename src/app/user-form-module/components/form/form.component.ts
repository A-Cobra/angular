import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { CountryFetcherService } from '../../services/country-fetcher/country-fetcher.service';
import { defaultUser } from '../../utils/default-user';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MyValidations } from '../../utils/my-validations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output()
  createUser: EventEmitter<User> = new EventEmitter<User>();
  @Input()
  currentUser: User = Object.assign({}, defaultUser);
  passwordConfirmation: string = '';
  countryList: string[] = [];
  stateList: string[] = [];
  minNumberOfPasswordChars: number = 12;

  userForm!: FormGroup;

  constructor(private countryService: CountryFetcherService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormGroup({
        value: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            MyValidations.passwordStrength(
              this.minNumberOfPasswordChars
            ) /*MyValidations.passStrength*/,
          ],
        }),
        confirmation: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            // MyValidations.passwordsMatch(
            //   this.getPassword()
            // ) /*MyValidations.match(password)*/,
            // MyValidations.passwordsMatch(this.userForm),
            // MyValidations.passwordsMatch('ok'),
          ],
        }),
      }),
      profileImage: new FormControl<string>('', {
        nonNullable: true,
        validators: [],
      }),
      birthDate: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, MyValidations.beforeToday],
      }),
      phone: new FormControl<number>(12345, {
        nonNullable: true,
        validators: [Validators.required, MyValidations.minDigits(5)],
      }),
      personalSiteUrl: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          /*MyValidations.Url*/
        ],
      }),
      about: new FormControl<string>('', {
        nonNullable: true,
      }),
      gender: new FormControl('male', {
        nonNullable: true,
        validators: [Validators.required, MyValidations.notNoneValue],
      }),
      address: new FormGroup({
        country: new FormControl<string>('none', {
          nonNullable: true,
          validators: [Validators.required, MyValidations.notNoneValue],
        }),
        state: new FormControl<string>('none', {
          nonNullable: true,
          validators: [Validators.required, MyValidations.notNoneValue],
        }),
      }),
      agreement: new FormControl<boolean>(false, {
        nonNullable: true,
        validators: [Validators.required, Validators.requiredTrue],
      }),
    });
    this.countryService.getCountries().subscribe({
      next: (countriesArray: any) => {
        this.countryList = countriesArray;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  emitCreationNotification() {
    console.log(this, this.userForm.value);
    // if (this.passwordConfirmationMatches()) {
    //   console.log('Creating User');
    //   this.createUser.emit(this.currentUser);
    // }
  }
  changeStateList() {
    const country = this.getControl('address.country')?.value;
    if (country !== 'none' && country !== undefined) {
      this.countryService.getStates(country).subscribe({
        next: (statesArray: any) => {
          this.stateList = statesArray;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      this.currentUser.address.state = 'none';
      this.stateList = [];
      this.getControl('address.state')?.reset();
    }
  }
  getControl(controlName: string): AbstractControl | null {
    return this.userForm.get(controlName);
  }
  getControlValue(controlName: string): string {
    if (this.userForm) {
      console.log('Getting value');
      return this.userForm.get(controlName)?.value === undefined
        ? ''
        : this.userForm.get(controlName)?.value;
    }
    return '';
  }
  passwordConfirmationMatches() {
    return (
      this.userForm.get('password')?.get('value')?.value ===
      this.userForm.get('password')?.get('confirmation')?.value
    );
  }
}

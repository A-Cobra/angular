import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { CountryFetcherService } from '../../services/country-fetcher/country-fetcher.service';
import { defaultUser } from '../../utils/default-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  userForm = new FormGroup({
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
        validators: [Validators.required],
      }),
      confirmation: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
    profileImage: new FormControl<string>('', {
      nonNullable: true,
      validators: [],
    }),
    birthDate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required /*MyValidations.beforeToday*/],
    }),
    phone: new FormControl<number>(12345, {
      nonNullable: true,
      validators: [Validators.minLength(5)],
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
      validators: [],
    }),
    address: new FormGroup({
      country: new FormControl<string>('none', {
        nonNullable: true,
        validators: [Validators.required /*MyValidators.nonNoneValue*/],
      }),
      state: new FormControl<string>('none', {
        nonNullable: true,
        validators: [Validators.required /*MyValidators.nonNoneValue*/],
      }),
    }),
    agreement: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue, Validators.required],
    }),
  });

  constructor(private countryService: CountryFetcherService) {}

  ngOnInit(): void {
    // this.countryService
    //   .getToken()
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (response: any) => {
    //       // this.countryList = countriesArray;
    //     },
    //     error: (error: any) => {
    //     },
    //   });
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
    console.log('Creating User');
    this.createUser.emit(this.currentUser);
    // if (this.passwordConfirmation === this.currentEmployee.password) {
    // }
  }
  changeStateList(country: string) {
    if (country !== 'none') {
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
    }
  }
}

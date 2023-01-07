import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { CountryFetcherService } from '../../services/country-fetcher/country-fetcher.service';
import { defaultUser } from '../../utils/default-user';

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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SuccessfulResponse } from './test-models/successful-response';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService!: any;
  // : {
  //   checkLogin: Function;
  // };
  let debugElement: DebugElement;

  beforeEach(async () => {
    mockLoginService = {
      checkLogin: jest.fn(),
      // checkLogin: () => of(false),
    };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: LoginService, useValue: mockLoginService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  describe('Typescript Tests', () => {
    test('should create LoginComponent', () => {
      expect(component).toBeTruthy();
    });

    //FORM Validations
    describe('Form validations', () => {
      test('form email is required', () => {
        const loginForm = component.loginForm;
        const email = component.getControl('data.email');
        email.setValue('');
        expect(loginForm.invalid).toBe(true);
        expect(email.hasError('required')).toBe(true);
      });
      test('form email has email validations', () => {
        const loginForm = component.loginForm;
        const email = component.getControl('data.email');
        email.setValue('myEmail.com');
        expect(loginForm.invalid).toBe(true);
        expect(email.hasError('email')).toBe(true);
      });
      test('form password is required', () => {
        const loginForm = component.loginForm;
        const password = component.getControl('data.password');
        password.setValue('');
        expect(loginForm.invalid).toBe(true);
        expect(password.hasError('required')).toBe(true);
      });
    });

    //API_CALL
    test('API gets called if form is valid', () => {
      jest.spyOn(mockLoginService, 'checkLogin').mockImplementation(() => {
        return of(true);
      });
      const loginButton = debugElement.query(By.css('.login-button'));
      const email = component.getControl('data.email');
      email.setValue('myEmail@applaudo.com');
      const password = component.getControl('data.password');
      password.setValue('password');
      loginButton.nativeElement.click();
      expect(mockLoginService.checkLogin).toHaveBeenCalledTimes(1);
      // IT IS MISSING THE IMPLEMENTATION OF ANGULAR MATERIAL
    });
  });

  describe('UI or HTML Tests', () => {
    test('component should have 2 inputs', () => {
      const inputsArray = debugElement.queryAll(By.css('input'));
      expect(inputsArray.length).toBe(2);
    });
    test('login button must work by triggering onFormSubmit', () => {
      jest.spyOn(component, 'onFormSubmit');
      let button = debugElement.nativeElement.querySelector('.login-button');
      button.click();
      fixture.whenStable().then(() => {
        expect(component.onFormSubmit).toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
});

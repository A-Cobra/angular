import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';

describe('LoginComponent Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService!: // : any;
  {
    checkLogin: () => Observable<boolean>;
  };
  let mockNotificationsService!: {
    notifyLoginSuccess: () => void;
    notifyLoginFailure: () => void;
    notifyWrongFormData: () => void;
  };
  let mockRouter!: {
    navigate: () => void;
  };

  let debugElement: DebugElement;

  beforeEach(async () => {
    mockLoginService = {
      checkLogin: jest.fn(),
    };
    mockNotificationsService = {
      notifyLoginSuccess: jest.fn(),
      notifyLoginFailure: jest.fn(),
      notifyWrongFormData: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: Router, useValue: mockRouter },

        // { provide: NotificationsService, provider: NotificationsService },
      ],
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
      test("if email and password aren't provided with validations, show wrong form data", () => {
        const loginButton = debugElement.query(By.css('.login-button'));
        const email = component.getControl('data.email');
        email.setValue('emailApplaudo.com');
        const password = component.getControl('data.password');
        password.setValue('password');
        loginButton.nativeElement.click();
        expect(
          mockNotificationsService.notifyWrongFormData
        ).toHaveBeenCalledTimes(1);
      });
    });

    //API_CALL
    test('API gets called if form is valid', () => {
      jest.spyOn(mockLoginService, 'checkLogin').mockImplementation(() => {
        return of(false);
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
    test('show error when api call returns false', () => {
      // // We set the return value to be false, thus meaning that the login was a failure
      jest.spyOn(mockNotificationsService, 'notifyLoginFailure');
      jest.spyOn(mockLoginService, 'checkLogin').mockImplementation(() => {
        return of(false);
      });
      const loginButton = debugElement.query(By.css('.login-button'));
      const email = component.getControl('data.email');
      email.setValue('email@example.com');
      const password = component.getControl('data.password');
      password.setValue('pass1');
      loginButton.nativeElement.click();
      expect(mockLoginService.checkLogin).toHaveBeenCalledTimes(1);
      expect(mockNotificationsService.notifyLoginFailure).toHaveBeenCalledTimes(
        1
      );
    });
    test('show success when api call returns true', () => {
      // // We set the return value to be true, thus meaning that the login was a success
      jest.spyOn(mockNotificationsService, 'notifyLoginSuccess');
      jest.spyOn(mockLoginService, 'checkLogin').mockImplementation(() => {
        return of(true);
      });
      const loginButton = debugElement.query(By.css('.login-button'));
      const email = component.getControl('data.email');
      email.setValue('trainee2@example.com');
      const password = component.getControl('data.password');
      password.setValue('Trainee 2');
      loginButton.nativeElement.click();
      expect(mockLoginService.checkLogin).toHaveBeenCalledTimes(1);
      expect(mockNotificationsService.notifyLoginSuccess).toHaveBeenCalledTimes(
        1
      );
    });
    //Router
    test('show redirection to be true because the navigate method was called once with certain arguments', () => {
      jest.spyOn(mockNotificationsService, 'notifyLoginSuccess');
      jest.spyOn(mockLoginService, 'checkLogin').mockImplementation(() => {
        return of(true);
      });
      const loginButton = debugElement.query(By.css('.login-button'));
      const email = component.getControl('data.email');
      email.setValue('trainee2@example.com');
      const password = component.getControl('data.password');
      password.setValue('Trainee 2');
      loginButton.nativeElement.click();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        'grocery-store',
        'home',
        'all-products',
      ]);
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
      expect(component.onFormSubmit).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
});

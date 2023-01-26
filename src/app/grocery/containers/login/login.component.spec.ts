import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService!: {
    checkLogin: Function;
  };
  let debugElement: DebugElement;

  beforeEach(async () => {
    mockLoginService = {
      checkLogin: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule],
      declarations: [LoginComponent],
      providers: [{ provide: LoginService, useValue: mockLoginService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  describe('Typescript Tests', () => {
    it('should create LoginComponent', () => {
      expect(component).toBeTruthy();
    });

    //FORM Validations
    test('form email is required', () => {
      const loginForm = component.loginForm;
      const email = component.getControl('data.email');
      email.setValue('');
      expect(loginForm.invalid).toBe(true);
      expect(email.hasError('required')).toBe(true);
    });
  });

  describe('UI or HTML Tests', () => {
    test('component should have 2 inputs', () => {
      const inputsArray = debugElement.queryAll(By.css('input'));
      expect(inputsArray.length).toBe(2);
    });
  });
});

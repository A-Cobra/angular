import { Component, OnInit } from '@angular/core';
import { LoginToken } from 'src/app/models/login-token.type';
import { LoginService } from '../../services/login.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    data: new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  });

  constructor(
    private loginService: LoginService,
    private notificationsService: NotificationsService
  ) {}

  onFormSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService
        .checkLogin(this.loginForm.value as LoginToken)
        .subscribe({
          next: loginSuccess => {
            loginSuccess
              ? this.notificationsService.notifyLoginSuccess()
              : this.notificationsService.notifyLoginFailure();
          },
        });
    } else {
      this, this.notificationsService.notifyWrongFormData();
    }
  }

  getControl(controlName: string): AbstractControl {
    return this.loginForm.get(controlName) as AbstractControl;
  }
}

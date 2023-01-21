import { Component, OnInit } from '@angular/core';
import { LoginToken } from 'src/app/models/login-token.type';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginToken: LoginToken = {
    data: {
      email: 'trainee2@example.com',
      password: 'Trainee$2',
    },
  };
  // constructor() {
  constructor(private loginService: LoginService) {
    this.loginService
      .checkLogin(this.loginToken)
      .subscribe((loginResponse: boolean) => {
        console.log(loginResponse);
      });
  }
}

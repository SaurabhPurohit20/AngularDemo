import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //loginForm: FormGroup;

  constructor(private authService: AuthService) { authService.checkLogin() }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;

      if (username === 'sp' && password === '123') this.authService.login();
      else { console.error('Invalid username or password.'); }
    } else console.error('Check username/password');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  message: string;
  hidePassword = true;
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    const success = await this.authService.login(
      this.username.value, 
      this.password.value
    )
    if (success) {
      const url = this.authService.redirectUrl
        ? this.authService.redirectUrl
        : '/expenses';
      this.router.navigate([url])
    } else {
      this.message = 'Login failed!'
    }
  }

}
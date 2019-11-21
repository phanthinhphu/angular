import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { Login, LoginState } from '../core/models/login.model';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notifier: NotifierService,
    private store: Store<LoginState>
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(10)
        ]
      ]
    })

    if (localStorage.getItem('user'))
      this.router.navigate(['/'])
  }

  login() {
    const newLogin: Login = {
      email: this.email.value,
      password: this.password.value
    }

    this.userService.login(newLogin).subscribe(
      (res: any) => {
        if (res.success) {
          const user: User = res.user;
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/author';
        }
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

}

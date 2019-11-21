import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState, User } from './core/models/user.model';
import { UserService } from './core/services/user.service';
import * as userActions from './login/store/login.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'library'

  constructor(
  ) { }

  ngOnInit() {

  }
}

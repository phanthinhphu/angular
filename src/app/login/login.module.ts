import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { UserService } from '../core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {  NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../share/customNotifier';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [UserService]
})
export class LoginModule { }

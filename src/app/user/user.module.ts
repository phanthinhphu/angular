import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { UserRouteModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NotifierModule } from 'angular-notifier';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { customNotifierOptions } from '../share/customNotifier';

import { UserService } from '../core/services/user.service';
import { UserUpdateComponent } from './user-update/user-update.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRouteModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers:[ UserService ]
})
export class UserModule { }

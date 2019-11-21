import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';
import { BorrowComponent } from './borrow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BorrowRouteModule } from './borrow-routing.module';

import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../share/customNotifier';


@NgModule({
  declarations: [
    BorrowListComponent,
    BorrowFormComponent,
    BorrowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BorrowRouteModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class BorrowModule { }

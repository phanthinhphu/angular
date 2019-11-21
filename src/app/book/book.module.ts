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

import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRouteModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookService } from '../core/services/book.service';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../share/customNotifier';



@NgModule({
  declarations: [
    BookFormComponent, 
    BookListComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    BookRouteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers:[BookService]
})
export class BookModule { }

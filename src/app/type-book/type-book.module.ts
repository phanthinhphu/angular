import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeBookRouteModule } from './type-book-routing.module';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';

import { TypeBookListComponent } from './type-book-list/type-book-list.component';
import { TypeBookFormComponent } from './type-book-form/type-book-form.component';
import { TypeBookComponent } from './type-book.component';

import * as CustomNotifer from '../share/customNotifier';
import { TypeBookService } from '../core/services/typeBook.service';
@NgModule({
  declarations: [
    TypeBookListComponent,
    TypeBookFormComponent,
    TypeBookComponent
  ],
  imports: [
    CommonModule,
    TypeBookRouteModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(CustomNotifer.customNotifierOptions)
  ],
  providers: [TypeBookService]
})
export class TypeBookModule { }

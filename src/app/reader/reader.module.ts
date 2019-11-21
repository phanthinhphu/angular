import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { ReaderRouteModule } from './reader-routing.module';
import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { ReaderService } from '../core/services/reader.service';

import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderFormComponent } from './reader-form/reader-form.component';
import { ReaderComponent } from './reader.component';
import { customNotifierOptions } from '../share/customNotifier';


@NgModule({
  declarations: [
    ReaderListComponent, 
    ReaderFormComponent,
    ReaderComponent
  ],
  imports: [
    CommonModule,
    ReaderRouteModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers:[ ReaderService ]
})
export class ReaderModule { }

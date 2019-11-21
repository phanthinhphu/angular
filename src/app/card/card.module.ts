import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardComponent } from './card.component';
import { CardRouteModule } from './card-routing.module';
import { CardService } from '../core/services/card.service';
import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../share/customNotifier';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardListComponent,
    CardFormComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CardRouteModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule
  ],
  providers: [CardService]
})
export class CardModule { }

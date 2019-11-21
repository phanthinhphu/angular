import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherComponent } from './publisher.component';
import { PublisherRouteModule } from './publisher-routing.module';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';
import { customNotifierOptions } from '../share/customNotifier';

@NgModule({
  declarations: [
    PublisherFormComponent, 
    PublisherListComponent,
    PublisherComponent
  ],
  imports: [
    CommonModule,
    PublisherRouteModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule
  ]
})
export class PublisherModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRouteModule } from './author-routing.module';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

import { AuthorService } from '../core/services/author.service';

import { ListAuthorComponent } from './list-author/list-author.component';
import { AuthorComponent } from './author.component';
import { AuthorFormComponent } from './author-form/author-form.component';

import * as CustomNotifer from '../share/customNotifier';
    
@NgModule({
    declarations: [
        ListAuthorComponent,
        AuthorComponent,
        AuthorFormComponent,
    ],
    imports: [
        AuthorRouteModule,
        CommonModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NotifierModule.withConfig(CustomNotifer.customNotifierOptions)
    ],
    providers: [AuthorService]
})

export class AuthorModule { };
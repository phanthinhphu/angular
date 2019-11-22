import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouterModule } from './app-routing.module';
import { AuthorModule } from './author/author.module';
import { AppReducerModule } from './app-reducer.model';
import { TypeBookModule } from './type-book/type-book.module';
import { CardModule } from './card/card.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    AppReducerModule,
    BrowserAnimationsModule,
    AuthorModule,
    TypeBookModule,
    CardModule,
    BookModule,
    UserModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

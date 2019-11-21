import { NgModule } from '@angular/core';
import { StoreModule, reduceState } from '@ngrx/store';

import { authorReducer } from '../app/author/store/author.reducer';
import { typeBookReducer } from '../app/type-book/store/typeBook.reducer';
import { cardReducer } from './card/store/card.reducer';
import { publisherReducer } from './publisher/store/publisher.reducer';
import { readerReducer } from './reader/store/reader.reducer';
import { bookReducer } from './book/store/book.reducer';
import { userReducer } from './user/store/user.reducer';
import { loginReducer } from './login/store/login.reducer';
import { borrowReducer } from './borrow/store/borrow.reducer';

const appReducers = {
    author: authorReducer,
    typeBook : typeBookReducer,
    card : cardReducer,
    publisher : publisherReducer,
    reader : readerReducer,
    book: bookReducer,
    user: userReducer,
    login: loginReducer,
    borrow: borrowReducer
};

@NgModule({
    imports: [StoreModule.forRoot(appReducers)],
    exports: [StoreModule]
})

export class AppReducerModule { }
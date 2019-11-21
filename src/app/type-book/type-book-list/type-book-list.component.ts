import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TypeBookState, TypeBook } from 'src/app/core/models/typebook.model';
import { TypeBookService } from 'src/app/core/services/typeBook.service';
import { NotifierService } from 'angular-notifier';

import * as typeBookActions from '../store/typeBook.action';

@Component({
  selector: 'app-type-book-list',
  templateUrl: './type-book-list.component.html'
})

export class TypeBookListComponent implements OnInit {

  typeBooks: TypeBook[];

  constructor(
    private store: Store<TypeBookState>,
    private typeBookService: TypeBookService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('typeBook').subscribe(
      (typeBooks: TypeBook[]) => this.typeBooks = typeBooks
    );

    this.typeBookService.getTypeBooks().subscribe(
      (res: any) => {
        const typeBooks: TypeBook[] = res.typeBooks;
        const newTypeBook = new typeBookActions.getTypeBooks(typeBooks);
        this.store.dispatch(newTypeBook);
      }
    );
  }

  deleteTypeBook(_id) {
    this.typeBookService.deleteTypeBook(_id).subscribe(
      (res: any) => {
        const typeBook: TypeBook = res.typeBook;
        const newTypeBook = new typeBookActions.deleteTypeBook(typeBook);
        this.store.dispatch(newTypeBook);
        if (res.success) this.notifier.notify('success', 'Success');
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

}

import { Component, OnInit,AfterContentChecked, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookState, Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import * as bookActions from '../store/book.action';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit,AfterContentInit {

  books: Book[];

  constructor(
    private store: Store<BookState>,
    private bookService: BookService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('book').subscribe(
      books => this.books = books
    )
  }

  ngAfterContentInit(){
    this.bookService.getBooks().subscribe(
      (res: any) => {
        const books: Book[] = res.books;
        const newBooks = new bookActions.getBooks(books);
        this.store.dispatch(newBooks);
      }
    )
  }

  deleteBook(_id) {
    this.bookService.deleteBook(_id).subscribe(
      (res: any) => {
        const book: Book = res.book;
        const newBook = new bookActions.deleteBook(book);
        this.store.dispatch(newBook);
        if (res.success)
          this.notifier.notify('success', 'Success');
      }
      , (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

}

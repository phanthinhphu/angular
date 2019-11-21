import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookState, NewBook, Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/core/models/author.model';
import { TypeBook } from 'src/app/core/models/typebook.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as bookActions from '../store/book.action';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  authors: Author[];
  typeBooks: TypeBook[];
  publishers: Publisher[];
  title: string = 'CREATE';
  id: string = '1';

  constructor(
    private store: Store<BookState>,
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      datePublish: ['', Validators.required],
      price: ['', [Validators.required]],
      author: ['', [Validators.required]],
      typeBooks: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
    })

    this.bookService.getcboAuthors().subscribe(
      (res: any) => this.authors = res.authors
    )

    this.bookService.getcboPublishers().subscribe(
      (res: any) => this.publishers = res.publishers
    )

    this.bookService.getcboTypeBooks().subscribe(
      (res: any) => this.typeBooks = res.typeBooks
    )

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');
        if (this.id) {
          this.bookService.getById(this.id).subscribe(
            (res: any) => {
              const book: Book = res.book;
              const getIds = book.typeBooks.map(({ _id }) => _id);
              this.name.setValue(book.name);
              this.price.setValue(book.price);
              this.publisher.setValue(book.publisher._id)
              this.author.setValue(book.author._id)
              this.typeBook.setValue(getIds);
              this.datePublish.setValue(book.datePublish);
            }
          )
        }
      }
    )

  }

  saveBook() {

    if (this.bookForm.invalid) return false;

    let newBook: NewBook = {
      name: this.name.value,
      datePublish: this.datePublish.value,
      price: this.price.value,
      author: this.author.value,
      publisher: this.publisher.value,
      typeBooks: (this.typeBook.value as string[])
    }

    if (this.id) {
      this.bookService.updateBook(this.id, newBook).subscribe(
        (res: any) => {
          const book: Book = res.book;
          const newBook = new bookActions.updateBook(book);
          this.store.dispatch(newBook);
          if (res.success)
            this.notifier.notify('success', 'Success');
        }
        , (error: any) => this.notifier.notify('warning', error.error.message)
      )
    } else {
      this.bookService.createBook(newBook).subscribe(
        (res: any) => {
          const book: Book = res.book;
          const newBook = new bookActions.createBook(book);
          this.store.dispatch(newBook);
          if (res.success)
            this.notifier.notify('success', 'Success');
          this.clearForm()
        }
        , (error: any) => this.notifier.notify('warning', error.error.message)
      )
    }

  }

  clearForm() {
    this.name.setValue('');
    this.price.setValue('');
    this.publisher.setValue('');
    this.author.setValue('');
    this.typeBook.setValue('');
    this.datePublish.setValue('');
  }

  get name() { return this.bookForm.get('name') }
  get datePublish() { return this.bookForm.get('datePublish') }
  get price() { return this.bookForm.get('price') }
  get author() { return this.bookForm.get('author') }
  get typeBook() { return this.bookForm.get('typeBooks') }
  get publisher() { return this.bookForm.get('publisher') }

}

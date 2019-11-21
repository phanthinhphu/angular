import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { Author, AuthorState } from '../../core/models/author.model';
import { AuthorService } from '../../core/services/author.service';

import * as authorActions from '../store/author.action';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html'
})

export class ListAuthorComponent implements OnInit {

  authors: Author[];

  constructor(
    private authorService: AuthorService,
    private store: Store<AuthorState>,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.store.select('author').subscribe(
      (authors: Author[]) => { this.authors = authors }
    )

    this.authorService.getAuthors().subscribe(
      (res: any) => {
        const authors: Author[] = res.authors;
        const newAuthors = new authorActions.getAuthors(authors);
        this.store.dispatch(newAuthors);
      },
      (error:any)=> console.log(error)
    )
  }

  deleteAuthor(id) {
    this.authorService.deleteAuthor(id).subscribe(
      (res: any) => {
        const author: Author = res.author;
        const newAuthor = new authorActions.deleteAuthor(author);
        this.store.dispatch(newAuthor);
        if (res.success) this.notifier.notify('success', 'Success');
      },
      (error: any) =>  this.notifier.notify('success', error.error.message)
    );

  }

}

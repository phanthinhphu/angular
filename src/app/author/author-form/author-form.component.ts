import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotifierService } from 'angular-notifier';
import { AuthorService } from '../../core/services/author.service';
import { Author, AuthorState } from '../../core/models/author.model';

import * as authorActions from '../store/author.action';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html'
})

export class AuthorFormComponent implements OnInit {

  authorForm: FormGroup;
  id: string;
  title: string = 'CREATE';
  toDay = new Date();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private store: Store<AuthorState>
  ) { }

  ngOnInit() {

    this.authorForm = this.fb.group({
      name: ['', [Validators.required]],
      note: [''],
      nativeCountry: [''],
      penName: [''],
      birthDay: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');
        if (this.id) {
          this.title = 'UPDATE'
          this.authorService.getByIdAuthor(this.id).subscribe(
            (res: any) => {
              const author: Author = res.author;
              this.name.setValue(author.name);
              this.penName.setValue(author.penName);
              this.note.setValue(author.note);
              this.nativeCountry.setValue(author.nativeCountry);
              this.birthDay.setValue(author.birthDay);
            }
          )
        }
      })
  }

  saveAuthor() {

    if (this.authorForm.invalid) return false;

    let newAuthor: Author = {
      name: this.name.value,
      penName: this.penName.value,
      note: this.note.value,
      birthDay: this.birthDay.value,
      nativeCountry: this.nativeCountry.value
    }

    if (this.id) {
      this.authorService.updateAuthor(this.id, newAuthor).subscribe(
        (res: any) => {
          const author: Author = res.author;
          const newAuthor = new authorActions.updateAuthor(author);
          this.store.dispatch(newAuthor);
          if (res.success) this.notifier.notify('success', 'Success');
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      );

    } else {
      this.authorService.createAuthor(newAuthor).subscribe(
        (res: any) => {
          const author: Author = res.author;
          const newAuthor = new authorActions.createAuthor(author);
          this.store.dispatch(newAuthor);
          if (res.success) this.notifier.notify('success', 'Success');
          this.resetForm();
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    }

  }

  resetForm() {
    this.name.setValue('');
    this.penName.setValue('');
    this.note.setValue('');
    this.nativeCountry.setValue('');
    this.birthDay.setValue('');
  }

  get name() { return this.authorForm.get('name'); }
  get note() { return this.authorForm.get('note'); }
  get penName() { return this.authorForm.get('penName'); }
  get birthDay() { return this.authorForm.get('birthDay') }
  get nativeCountry() { return this.authorForm.get('nativeCountry'); }

}

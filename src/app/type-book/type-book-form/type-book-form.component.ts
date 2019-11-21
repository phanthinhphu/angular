import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotifierService } from 'angular-notifier'
import { TypeBookService } from 'src/app/core/services/typeBook.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TypeBook, TypeBookState } from 'src/app/core/models/typebook.model';

import * as typeBookActions from '../store/typeBook.action';

@Component({
  selector: 'app-type-book-form',
  templateUrl: './type-book-form.component.html'
})

export class TypeBookFormComponent implements OnInit {

  title: string = 'CREATE';
  id: string;
  typeBookForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private typeBookService: TypeBookService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private store: Store<TypeBookState>
  ) { }

  ngOnInit() {
    this.typeBookForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');

        if (this.id) {
          this.title = 'UPDATE';
          this.typeBookService.getTypeBookById(this.id).subscribe(
            (res: any) => {
              const typeBook: TypeBook = res.typeBook;
              this.name.setValue(typeBook.name);
            },
            (error: any) => {
              this.notifier.notify('warning', error.error.message)
            }
          )
        };
      }
    );

  }

  saveTypeBook() {
    if (this.typeBookForm.invalid) return false;

    let newTypeBook: TypeBook = {
      name: this.name.value
    }

    if (this.id) {
      this.typeBookService.updateTypeBook(this.id, newTypeBook).subscribe(
        (res: any) => {
          const typeBook: TypeBook = res.typeBook;
          const newTypeBook = new typeBookActions.updateTypeBook(typeBook);
          this.store.dispatch(newTypeBook);
          if (res.success) this.notifier.notify('success', 'Success');
        },
        (error:any)=> this.notifier.notify('warning',error.error.message)
      )
    } else {
      this.typeBookService.createTypeBook(newTypeBook).subscribe(
        (res: any)=>{
          const typeBook : TypeBook = res.typeBook;
          const newTypeBook = new typeBookActions.createTypeBook(typeBook);;
          this.store.dispatch(newTypeBook);
          if(res.success) this.notifier.notify('success','Success');
          this.clearFormTypeBook();
        },
        (error:any)=> this.notifier.notify('warning',error.error.message)
      )
    }
  }

  clearFormTypeBook() {
    this.name.setValue('');
  }

  get name() {
    return this.typeBookForm.get('name');
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BorrowState, Borrow, ComboboxBook } from 'src/app/core/models/borrow.model';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as borrowActions from '../store/borrow.action';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-borrow-form',
  templateUrl: './borrow-form.component.html'
})
export class BorrowFormComponent implements OnInit {

  borrowForm: FormGroup;
  cboBook: ComboboxBook[];
  cboCard: [];
  id;

  today = new Date(new Date().toISOString().slice(0, 10));

  tomorrow = new Date(
    this.today.setDate(this.today.getDate() + 1)
  )

  constructor(
    private store: Store<BorrowState>,
    private borrowService: BorrowService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.borrowForm = this.fb.group({
      startDate: [this.today, [Validators.required]],
      endDate: ['', [Validators.required]],
      user: ['', [Validators.required]],
      books: ['', [Validators.required]],
      card: ['', [Validators.required]],
      status: [''],
      note: ['']
    })

    this.borrowService.getCards().subscribe(
      (res: any) => { this.cboCard = res.card }
    )

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');

        const _id = this.id ? this.id : 1
        this.borrowService.getBooks(_id).subscribe(
          (res: any) => {
            const books = res.books.map(b => {
              b.checked = false;
              return b;
            })
            this.cboBook = books;
          }
        )

        if (!this.id) return false;

        this.borrowService.getById(this.id).subscribe(
          (res: any) => {
            const borrow: Borrow = res.borrow;
            this.startDate.setValue(borrow.startDate);
            this.endDate.setValue(borrow.endDate);
            this.note.setValue(borrow.note);
            this.status.setValue(borrow.status);
            this.card.setValue(borrow.card._id);
            const books = borrow.books.map(b => { return b['_id'] })
            this.books.setValue(books);
            this.cboBook.map(item => {
              const book = borrow.books.find(x => x._id == item._id)
              if (book) item.checked = true;
              return item;
            })
          }
        )
      }
    )

    const localUser = JSON.parse(localStorage.getItem('user'));
    this.user.setValue(localUser._id);
  }

  saveBorrow() {

    if (this.borrowForm.invalid) return false;

    const newBorrow: Borrow = {
      endDate: this.endDate.value,
      startDate: this.startDate.value,
      books: this.books.value,
      card: this.card.value,
      note: this.note.value,
      status: this.status.value ? this.status.value : false,
      user: this.user.value
    }

    if (this.id) {
      this.borrowService.updateBorrow(this.id, newBorrow).subscribe(
        (res: any) => {
          const borrow: Borrow = res.borrow;
          const newBorrow = new borrowActions.updateBorrow(borrow);
          this.store.dispatch(newBorrow);
          if (res.success) this.notifier.notify('success', 'Success');
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    } else {
      this.borrowService.createBorrow(newBorrow).subscribe(
        (res: any) => {
          const borrow: Borrow = res.borrow;
          const newBorrow = new borrowActions.createBorrow(borrow);
          this.store.dispatch(newBorrow);
          if (res.success) this.notifier.notify('success', 'Success');
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    }

  }

  onCheck(_id) {
    const findBook = this.cboBook.find((b: any) => b._id == _id);
    findBook.checked = !findBook.checked;

    const filterBook = this.cboBook.map(x => {
      if (x.checked) return x['_id']
    });

    this.books.setValue(filterBook.filter(x => x));

  }

  a() {
    console.log(this.borrowForm)
  }

  get startDate() { return this.borrowForm.get('startDate') }
  get endDate() { return this.borrowForm.get('endDate') }
  get user() { return this.borrowForm.get('user') }
  get card() { return this.borrowForm.get('card') }
  get books() { return this.borrowForm.get('books') }
  get note() { return this.borrowForm.get('note') }
  get status() { return this.borrowForm.get('status') }

}

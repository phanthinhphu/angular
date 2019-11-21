import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Borrow, BorrowState } from 'src/app/core/models/borrow.model';
import { BorrowService } from 'src/app/core/services/borrow.service';
import { NotifierService } from 'angular-notifier';
import * as borrowActions from '../store/borrow.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html'
})
export class BorrowListComponent implements OnInit {

  borrows: Borrow[];

  constructor(
    private store: Store<BorrowState>,
    private borrowService: BorrowService,
    private notifier: NotifierService,
    private router: Router
  ) { }

  ngOnInit() {

    this.store.select('borrow').subscribe(
      borrows => this.borrows = borrows
    )

    this.borrowService.getBorrows().subscribe(
      (res: any) => {
        const borrows: Borrow[] = res.borrows;
        console.log(borrows);
        const newBorrow = new borrowActions.getBorrows(borrows);
        this.store.dispatch(newBorrow);
      }
    )

  }

  onUpdate(_id){
    this.router.navigate(['/borrow/edit/'+_id])
  }
  deleteBorrow(_id) { }

}

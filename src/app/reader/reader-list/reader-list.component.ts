import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotifierService } from 'angular-notifier';
import { ReaderState, Reader } from 'src/app/core/models/reader.model';
import { ReaderService } from 'src/app/core/services/reader.service';

import * as readerActions from '../store/reader.action';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html'
})

export class ReaderListComponent implements OnInit {

  readers: Reader[];

  constructor(
    private store: Store<ReaderState>,
    private readerService: ReaderService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('reader').subscribe(
      readers => this.readers = readers
    )

    this.readerService.getReaders().subscribe(
      (res: any) => {
        const readers: Reader[] = res.readers;
        const newReader = new readerActions.getReaders(readers);
        this.store.dispatch(newReader);
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )

  }

  deleteReader(_id) {
    this.readerService.deleteReader(_id).subscribe(
      (res: any) => {
        const reader: Reader = res.reader;
        const newReader = new readerActions.deleteReader(reader);
        this.store.dispatch(newReader);
        if (res.success)
          this.notifier.notify('success', 'Success')
      },
      (error) => this.notifier.notify('warning', error.error.message)
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PublisherService } from 'src/app/core/services/publisher.service';
import { NotifierService } from 'angular-notifier';
import { PublisherState, Publisher } from 'src/app/core/models/publisher.model';

import * as publisherActions from '../store/publisher.action';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html'
})

export class PublisherListComponent implements OnInit {

  publishers: Publisher[];

  constructor(
    private store: Store<PublisherState>,
    private publisherService: PublisherService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('publisher').subscribe(
      (publishers) => {
        this.publishers = publishers
      }
    )

    this.publisherService.getPublishers().subscribe(
      (res: any) => {
        const publishers: Publisher[] = res.publishers;
        const newPublisher = new publisherActions.getPublishers(publishers);
        this.store.dispatch(newPublisher);
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

  deletePublisher(_id) {
    this.publisherService.deletePublisher(_id).subscribe(
      (res: any) => {
        const publisher: Publisher = res.publisher;
        const newPublisher = new publisherActions.deletePublisher(publisher);
        this.store.dispatch(newPublisher);
        if (res.success)
          this.notifier.notify('success', 'Success');
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }
}

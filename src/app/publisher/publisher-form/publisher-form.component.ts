import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';

import { PublisherService } from 'src/app/core/services/publisher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publisher, PublisherState } from 'src/app/core/models/publisher.model';
import * as publisherActions from '../store/publisher.action';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html'
})

export class PublisherFormComponent implements OnInit {

  publisherForm: FormGroup;
  id: string;
  title: string = 'CREATE';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    private store: Store<PublisherState>,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.publisherForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');
        if (!this.id) return;

        this.title = 'UPDATE'
        this.publisherService.getById(this.id).subscribe(
          (res: any) => {
            const publisher: Publisher = res.publisher;
            this.name.setValue(publisher.name);
            this.address.setValue(publisher.address);
            this.email.setValue(publisher.email);
          }
        )
      }
    )

  }

  savePublisher() {

    let newPublisher: Publisher = {
      name: this.name.value,
      address: this.address.value,
      email: this.email.value
    }

    if (this.id) {
      this.publisherService.updatePublisher(this.id, newPublisher).subscribe(
        (res: any) => {
          const publisher: Publisher = res.publisher;
          const newPublisher = new publisherActions.updatePublisher(publisher)
          this.store.dispatch(newPublisher);
          if (res.success)
            this.notifier.notify('success', 'Success');
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    } else {
      this.publisherService.createPublisher(newPublisher).subscribe(
        (res: any) => {
          const publisher: Publisher = res.publisher;
          const newPublisher = new publisherActions.createPublisher(publisher);
          this.store.dispatch(newPublisher);
          if (res.success)
            this.notifier.notify('success', 'Success')
          this.clearFrom();
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    }
  }

  clearFrom() {
    this.name.setValue('');
    this.address.setValue('');
    this.email.setValue('');
  }

  get name() { return this.publisherForm.get('name') }
  get address() { return this.publisherForm.get('address') }
  get email() { return this.publisherForm.get('email') }

}

import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/core/services/card.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Card, CardState } from 'src/app/core/models/card.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reader } from 'src/app/core/models/reader.model';
import { Store } from '@ngrx/store';

import * as cardActions from '../store/card.action';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent implements OnInit {

  card: Card;
  readers: Reader[];
  cardForm: FormGroup;
  id: string;
  selected: string;
  
  toDay = new Date().toISOString().slice(0, 10);
  minDate: Date = new Date(this.toDay);

  tomorrow: Date = new Date(
    this.minDate.setDate(this.minDate.getDate() + 1)
  )

  constructor(
    private cardService: CardService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<CardState>
  ) { }

  ngOnInit() {

    this.cardForm = this.fb.group({
      startDate: [this.toDay, Validators.required],
      endDate: [this.tomorrow, Validators.required],
      note: [''],
      reader: ['', [Validators.required]]
    })

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');

        if (this.id) {
          this.cardService.getCardById(this.id).subscribe(
            (res: any) => {
              const card = res.card;
              this.startDate.setValue(card.startDate);
              this.endDate.setValue(card.endDate);
              this.note.setValue(card.note);
              this.reader.setValue(card.reader);
            }
          );
        }
      }
    )

    this.cardService.getComboboxReader().subscribe(
      (res: any) => this.readers = res.readers,
      (error: any) => console.log(error)
    )

  }

  saveCard() {
    if (this.cardForm.invalid) return;

    let newCard: Card = {
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      note: this.note.value,
      reader: this.reader.value
    }

    if (this.id) {
      this.cardService.updateCard(this.id, newCard).subscribe(
        (res: any) => {
          const card: Card = res.card;
          const newCard = new cardActions.updateCard(card);
          this.store.dispatch(newCard);
          if (res.success)
            this.notifier.notify('success', 'Success')
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    } else {
      this.cardService.createCard(newCard).subscribe(
        (res: any) => {
          const card: Card = res.card;
          const newCard = new cardActions.createCard(card);
          this.store.dispatch(newCard);
          if (res.success)
            this.notifier.notify('success', 'Success')
          this.clearCardForm();
        },
        (error: any) => this.notifier.notify('warning', error.error.message)
      )
    }
  }

  clearCardForm() {
    this.startDate.setValue('');
    this.endDate.setValue('');
    this.note.setValue('');
    this.reader.setValue('')
  }

  onChangeStartDate() {
    const startDate = new Date(this.startDate.value);

    const minDate = new Date(
      startDate.setDate(startDate.getDate() + 1)
    )

    this.minDate = minDate;
    this.endDate.setValue(minDate);
  }

  get startDate() { return this.cardForm.get('startDate') };
  get endDate() { return this.cardForm.get('endDate') };
  get note() { return this.cardForm.get('note') };
  get reader() { return this.cardForm.get('reader') };


}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CardService } from 'src/app/core/services/card.service';
import { NotifierService } from 'angular-notifier'

import { Card, CardState } from 'src/app/core/models/card.model';
import * as cardActions from '../store/card.action';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html'
})

export class CardListComponent implements OnInit {

  cards: Card[];

  constructor(
    private store: Store<CardState>,
    private cardService: CardService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {

    this.store.select('card').subscribe(
      (cards: any) => {this.cards = cards}
    )

    this.cardService.getCards().subscribe(
      (res: any) => {
        const cards: Card[] = res.cards;
        const newCards = new cardActions.getCards(cards);
        this.store.dispatch(newCards);
      }
    )

  }

  deleteCard(_id) {
    this.cardService.deleteCard(_id).subscribe(
      (res: any) => {
        const card: Card = res.card;
        const newCard = new cardActions.deleteCard(card);
        this.store.dispatch(newCard);
        if (res.success) this.notifier.notify('success', 'Success');
      },
      (error: any) => this.notifier.notify('warning', error.error.message)
    )
  }

}

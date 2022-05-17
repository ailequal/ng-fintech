import {Component, OnInit} from '@angular/core';
import {Card} from "../model/card";

@Component({
  selector: 'ae-card-list',
  template: `
    <p>
      card-list works!
    </p>
  `,
  styles: []
})
export class CardListComponent implements OnInit {

  cards: Card[] = [
    {
      _id: '347987294424',
      number: '4263982640269299',
      ownerId: '023923463256',
      owner: 'Mario',
      type: 'visa',
      amount: 4500
    },
    {
      _id: '347427295724',
      number: '4263982640269299',
      ownerId: '423973433276',
      owner: 'Luigi',
      type: 'mastercard',
      amount: 5000
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

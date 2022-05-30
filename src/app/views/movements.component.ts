import {Component, OnInit} from '@angular/core';
import {Card} from "../model/card";
import {Movement, MovementType} from "../model/movement";

@Component({
  selector: 'ae-movements',
  template: `
    <div>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select>
          <mat-option *ngFor="let card of cards" [value]="card._id">
            {{card.number}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{2000 | currency: 'EUR'}}</h2>

      <div>
        <ae-movement
          *ngFor="let movement of movements"
          [title]="movement.title"
          [description]="movement.description"
          [amount]=movement.amount
          [type]="movement.type"
          [date]="movement.timestamp | date: 'dd/MM/yyyy'"
        >
        </ae-movement>
      </div>

      <button class="load-more" mat-stroked-button>Carica altro</button>
    </div>
  `,
  styles: [`
    .load-more {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class MovementsComponent implements OnInit {

  // TODO: Hard coded values for now.
  cards: Card[] = [
    {
      _id: '347987294424',
      number: '4263982640269214',
      ownerId: '023923463256',
      owner: 'Mario',
      type: 'mastercard',
      amount: 4500
    },
    {
      _id: '347987294425',
      number: '4263982640269215',
      ownerId: '023923463257',
      owner: 'Luigi',
      type: 'visa',
      amount: 5000
    },
  ];

  movements: Movement[] = [
    {
      _id: '437264958372',
      title: 'Biglietto aereo Milano-Parigi',
      description: 'Comprato un biglietto aereo per Parigi da Milano.',
      cardId: '347987294424',
      amount: 200,
      type: 'out',
      timestamp: 1643923659000
    },
    {
      _id: '437264958373',
      title: 'Spesa presso Despar',
      description: 'Comprato la spesa della settimana al Despar.',
      cardId: '347987294424',
      amount: 160,
      type: 'out',
      timestamp: 1642923659000
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}

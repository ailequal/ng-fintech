import {Component, OnInit} from '@angular/core';
import {Card} from "../model/card";
import {Movement, MovementType} from "../model/movement";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'ae-movements',
  template: `
    <div>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select (selectionChange)="onSelectionChange($event)">
          <mat-option *ngFor="let card of cards" [value]="card._id">
            {{card.number}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{selectedCard ? (selectedCard.amount | currency: 'EUR') : '---'}}</h2>

      <div *ngIf="selectedCard" class="movements">
        <ae-movement
          *ngFor="let movement of selectedMovements"
          [title]="movement.title"
          [description]="movement.description"
          [amount]=movement.amount
          [type]="movement.type"
          [date]="movement.timestamp | date: 'dd/MM/yyyy'"
        >
        </ae-movement>
      </div>

      <button (click)="onLoadMore($event)" class="load-more" mat-stroked-button>Carica altro</button>
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

  selectedCard: Card | null = null

  movements: { id: string, movements: Movement[] }[] = [
    {
      id: '347987294424',
      movements: [
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
        }
      ]
    }
  ]

  selectedMovements: Movement[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: MatSelectChange) {
    if (!event.value) {
      this.selectedCard = null;
      this.selectedMovements = [];
      return;
    }

    // Set the active card.
    const selectedCard = this.cards.find(element => {
      return element._id === event.value
    })

    if (!selectedCard) {
      this.selectedCard = null;
      this.selectedMovements = []
      return;
    }

    this.selectedCard = selectedCard

    // Set the active movements.
    const selectedMovements = this.movements.find(element => {
      return element.id === this.selectedCard?._id
    })

    if (!selectedMovements) {
      this.selectedMovements = []
      return;
    }

    // TODO: Only add 5 more movements each time, until it's full.
    this.selectedMovements = selectedMovements.movements
  }

  onLoadMore(event: MouseEvent) {
    console.log(event)
  }

}

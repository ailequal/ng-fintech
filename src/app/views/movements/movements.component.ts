import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Card} from "../../models/card";
import {Movement} from "../../models/movement";
import {MatSelectChange} from "@angular/material/select";
import {Observable} from "rxjs";
import {CardService} from "../../api/card.service";

@Component({
  selector: 'ae-movements',
  template: `
    <div>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select (selectionChange)="onSelectionChange($event)">
          <mat-option *ngFor="let card of (cards$ | async)" [value]="card">
            {{card.number}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{selectedCard ? (selectedCard.amount | currency: 'EUR') : '---'}}</h2>

      <div *ngIf="selectedCard" class="movements">
        <!--TODO: The movement component should be refactored. We might want to also transfer the value "total" from movements$.-->
        <ae-movement
          *ngFor="let movement of ((movements$ | async)?.data)"
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsComponent implements OnInit {

  cards$: Observable<Card[]> = this._cardService.getCards()

  selectedCard: Card | null = null

  movements$: Observable<{ data: Movement[], total: number }> | null = null

  constructor(private _cardService: CardService) {
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: MatSelectChange) {
    if (!event.value) {
      this.selectedCard = null;
      this.movements$ = null;
      return;
    }

    // Set the active card.
    this.selectedCard = event.value as Card

    // Set the active movements.
    this.movements$ = this._cardService.getCardMovements(this.selectedCard._id)

    // TODO: Only add 5 more movements each time, until it's full.
  }

  onLoadMore(event: MouseEvent) {
    console.log(event)
  }

}

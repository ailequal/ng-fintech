import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../../models/card";

@Component({
  selector: 'ae-card-list',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title class="title">Carte</mat-card-title>
      </mat-card-header>

      <mat-list class="cards" role="list">
        <mat-list-item *ngFor="let card of cards;" role="listitem">
          <div class="card">

            <div class="info">
              <div class="left">
                <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Credit card icon">credit_card
                </mat-icon>
              </div>

              <div class="right">
                <div class="top">
                  <span class="card-number">{{card.number}}</span>
                </div>
                <div class="bottom">
                  <span class="card-amount">{{card.amount | currency: 'EUR'}}</span>
                  <span class="separator">&nbsp;-&nbsp;</span>
                  <span class="card-type">{{card.type}}</span>
                </div>
              </div>
            </div>

            <mat-action-list class="actions">
              <button
                mat-list-item
                (click)="onReceipt.emit(card)"
                matTooltip="Vedi movimenti"
                matTooltipPosition="below"
                matTooltipHideDelay="500"
              >
                <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Receipt long icon">receipt_long
                </mat-icon>
              </button>

              <button
                mat-list-item
                (click)="onDelete.emit(card)"
                matTooltip="Rimuovi"
                matTooltipPosition="below"
                matTooltipHideDelay="500"
              >
                <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Delete icon">delete</mat-icon>
              </button>
            </mat-action-list>

          </div>
        </mat-list-item>
      </mat-list>

      <mat-card-actions align="end">
        <button
          mat-raised-button
          (click)="onAdd.emit()"
          type="button"
          class="full-width"
        >
          Aggiungi
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .cards > .mat-list-item {
      height: 105px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .cards .card {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .cards .card > .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 30px;
      max-width: 400px;
      width: 100%;
    }

    .cards .card > .info > .left {
    }

    .cards .card > .info > .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
    }

    .cards .card > .info > .right > .bottom .card-amount {
      font-weight: 700;
    }

    .cards .card > .actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 30px;
      padding: 0;
    }

    .full-width {
      width: 100%;
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .cards > .mat-list-item {
        height: 48px;
      }

      .cards .card {
        flex-direction: row;
        align-items: center;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {

  @Input() cards!: Card[];

  @Output() onReceipt: EventEmitter<Card> = new EventEmitter<Card>();

  @Output() onDelete: EventEmitter<Card> = new EventEmitter<Card>();

  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}

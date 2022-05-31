import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Card} from "../model/card";
import {TransferForm} from "../model/transfer";

@Component({
  selector: 'ae-transfer',
  template: `
    <form #f="ngForm">
      <mat-card class="card-form">

        <mat-card-header>
          <mat-card-title class="title">Trasferimenti</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-card-actions>
            <button mat-stroked-button type="button" class="full-width" (click)="onContactList.emit($event)">
              Lista contatti
            </button>
          </mat-card-actions>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nome</mat-label>
            <input
              ngModel
              name="name"
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Lucas"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              ngModel
              name="surname"
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Tip"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>IBAN</mat-label>
            <input
              ngModel
              name="iban"
              matInput
              type="text"
              required
              minlength="27"
              maxlength="27"
              placeholder="IT02L1234512345123456789012"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Importo</mat-label>
            <input
              ngModel
              name="amount"
              matInput
              type="number"
              required
              placeholder="100"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Seleziona una carta</mat-label>
            <mat-select ngModel name="card" required>
              <mat-option *ngFor="let card of cards" [value]="card._id">
                {{card.number}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            (click)="onSubmit.emit(f.value)"
            [disabled]="!f.valid"
            type="button"
            class="full-width mb"
            color="primary"
          >
            Trasferisci denaro
          </button>
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .card-form {
      min-width: 120px;
    }

    .full-width {
      width: 100%;
    }

    .mat-card-title {
      font-weight: 400;
    }

    .mat-card-actions .mat-button,
    .mat-card-actions .mat-raised-button,
    .mat-card-actions .mat-stroked-button {
      margin: 0 0 0 0;
    }

    .mat-card-actions .mat-button.mb,
    .mat-card-actions .mat-raised-button.mb,
    .mat-card-actions .mat-stroked-button.mb {
      margin-bottom: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit {

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

  @ViewChild('f', {read: NgForm, static: true}) f!: NgForm;

  @Input() selectedContact: any = null;

  @Output() onSubmit: EventEmitter<TransferForm> = new EventEmitter<TransferForm>();

  @Output() onContactList: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CardForm} from "../../../models/card";

@Component({
  selector: 'ae-card-form',
  template: `
    <form #f="ngForm">
      <mat-card class="card-form">

        <mat-card-header>
          <mat-card-title class="title">Aggiungi carta</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Tipo di carta</mat-label>
            <mat-select ngModel name="type" required>
              <mat-option
                *ngFor="let t of cardTypes"
                [value]="t"
              >
                {{t | titlecase}}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <div class="container">
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
          </div>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nº Carta</mat-label>
            <input
              ngModel
              name="number"
              matInput
              type="text"
              required
              pattern="^[0-9]{16}$"
              placeholder="0000111122223333"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Codice di sicurezza</mat-label>
            <input
              ngModel
              name="csc"
              matInput
              type="text"
              required
              pattern="^[0-9]{3}$"
              placeholder="012"
            >
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
            Aggiungi carta
          </button>

          <button
            mat-button
            (click)="onCancel.emit();"
            type="button"
            class="full-width"
            color="warn"
          >
            Annulla
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

    /* Small size */
    @media screen and (min-width: 576px) {
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements OnInit {

  cardTypes: string[] = ['mastercard', 'visa']

  @ViewChild('f', {read: NgForm, static: true}) f!: NgForm;

  @Output() onSubmit: EventEmitter<CardForm> = new EventEmitter<CardForm>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  cleanUp() {
    this.f.resetForm()
  }

}

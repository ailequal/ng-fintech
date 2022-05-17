import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'ae-card-form',
  template: `
    <form #f="ngForm" (ngSubmit)="submitHandler(f)">
      <mat-card class="card-form">

        <mat-card-header>
          <mat-card-title>Aggiungi carta</mat-card-title>
        </mat-card-header>

        <mat-card-content>
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
            <mat-label>Nº Carta</mat-label>
            <input
              ngModel
              name="cardNumber"
              matInput
              type="number"
              required
              pattern="^[0-9]{16}$"
              placeholder="0000111122223333"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Codice di sicurezza</mat-label>
            <input
              ngModel
              name="cardSecurityCode"
              matInput
              type="number"
              required
              pattern="^[0-9]{3}$"
              placeholder="012"
            >
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            type="submit"
            [disabled]="!f.valid"
            class="full-width mb"
            color="primary"
          >
            Aggiungi carta
          </button>

          <button
            mat-button
            (click)="onCancel.emit()"
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
    .sign-in {
      min-width: 120px;
      margin: 20px auto;
    }

    .full-width {
      width: 100%;
    }

    .mat-card-header {
      justify-content: center;
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
export class CardFormComponent implements OnInit {

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submitHandler(f: NgForm) {
    console.log(f.value)
  }

}

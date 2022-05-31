import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TransferForm} from "../model/transfer";

@Component({
  selector: 'ae-contact-form',
  template: `
    <form #f="ngForm">
      <mat-card class="contact-form">

        <mat-card-header>
          <mat-card-title class="title">Nuovo contatto</mat-card-title>
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
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            (click)="submitHandler()"
            [disabled]="!f.valid"
            type="button"
            class="full-width mb"
            color="primary"
          >
            Salva
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
  `]
})
export class ContactFormComponent implements OnInit {

  @ViewChild('f', {read: NgForm, static: true}) f!: NgForm;

  @Output() onSubmit: EventEmitter<TransferForm> = new EventEmitter<TransferForm>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submitHandler() {
    this.onSubmit.emit(this.f.value)
  }

  cleanUp() {
    this.f.resetForm()
  }

}

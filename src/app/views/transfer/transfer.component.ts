import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Card} from "../../models/card";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContactsComponent} from "./components/contacts.component";
import {Contact} from "../../models/contact";
import {Observable} from "rxjs";
import {CardService} from "../../api/card.service";
import {TransferService} from "../../api/transfer.service";
import {TransferForm} from "../../models/transfer";
import {amountValidator} from "../../shared/validators/amount.validator";

@Component({
  selector: 'ae-transfer',
  template: `
    <form [formGroup]="transferForm">
      <mat-card class="transfer-form">

        <mat-card-header>
          <mat-card-title class="title">Trasferimenti</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-card-actions>
            <button mat-stroked-button type="button" class="full-width" (click)="contactListHandler($event)">
              Lista contatti
            </button>
          </mat-card-actions>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nome</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Lucas"
              formControlName="name"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Tip"
              formControlName="surname"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>IBAN</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="27"
              maxlength="27"
              placeholder="IT02L1234512345123456789012"
              formControlName="iban"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Importo</mat-label>
            <input
              matInput
              type="text"
              required
              placeholder="100"
              formControlName="amount"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Seleziona una carta</mat-label>
            <mat-select formControlName="cardId" required>
              <mat-option *ngFor="let card of (cards$ | async)" [value]="card._id">
                {{card._id}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            (click)="submitHandler()"
            [disabled]="!transferForm.valid"
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

  transferForm = this._fb.group({
    name: [''],
    surname: [''],
    iban: [''],
    amount: ['', [amountValidator]],
    cardId: [''],
  });

  cards$: Observable<Card[]> = this._cardService.getCards()

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _transferService: TransferService,
    private _cardService: CardService
  ) {
  }

  ngOnInit(): void {
  }

  contactListHandler(event: MouseEvent) {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '100%',
      maxWidth: '768px',
    })
    dialogRef.afterClosed().subscribe(result => {
      // Fill the form transfer values with the selected contact information.
      if (!result)
        return

      const selectedContact = result as Contact;

      this.transferForm.patchValue({
        name: selectedContact.name,
        surname: selectedContact.surname,
        iban: selectedContact.iban
      })
    });
  }

  submitHandler() {
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return

      const transferForm = this.transferForm.value as TransferForm

      this._transferService.setTransfer(transferForm).subscribe(v => {
        console.log(v)

        this._snackBar.open('Trasferimento inviato', '✅', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });

        this.cleanUp()
      })
    });
  }

  cleanUp() {
    this.transferForm.reset()
  }

}

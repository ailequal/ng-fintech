import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Card} from "../../models/card";
import {TransferForm} from "../../models/transfer";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContactsComponent} from "../movements/components/contacts.component";
import {Contact} from "../../models/contact";
import {contacts} from 'src/assets/mock-contacts';

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
              type="number"
              required
              placeholder="100"
              formControlName="amount"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Seleziona una carta</mat-label>
            <mat-select formControlName="card" required>
              <mat-option *ngFor="let card of cards" [value]="card._id">
                {{card.number}}
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
    amount: [''],
    card: [''],
  });

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

  contacts: Contact[] = contacts

  @Input() selectedContact: any = null;

  @Output() onContactList: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() onSubmit: EventEmitter<TransferForm> = new EventEmitter<TransferForm>();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
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
      // Fill the form transfer values, if the id is available.
      if (!result) {
        this.onContactList.emit(event)
        return
      }

      const selectedUser = this.contacts.find(element => {
        return element._id === result
      })

      if (!selectedUser) {
        this.onContactList.emit(event)
        return
      }

      // Finally, fill the form with the new data.
      this.transferForm.patchValue({
        name: selectedUser.name,
        surname: selectedUser.surname,
        iban: selectedUser.iban
      })

      this.onContactList.emit(event)
    });
  }

  submitHandler() {
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return

      // TODO: Save the data on the server.
      this.onSubmit.emit(this.transferForm.value)

      this._snackBar.open('Trasferimento inviato', '✅', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
    });
  }

  cleanUp() {
    this.transferForm.reset()
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Card} from "../../models/card";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContactsComponent} from "./components/contacts.component";
import {Contact} from "../../models/contact";
import {BehaviorSubject, Observable} from "rxjs";
import {CardService} from "../../api/card.service";
import {TransferService} from "../../api/transfer.service";
import {TransferForm} from "../../models/transfer";
import {amountValidator} from "../../shared/validators/amount.validator";
import {ibanValidator} from "../../shared/validators/iban.validator";
import {CardIdValidator} from "../../shared/validators/card-id.validator";
import {TransferValidator} from "../../shared/validators/transfer.validator";

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
              placeholder="Lucas"
              formControlName="name"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              matInput
              type="text"
              placeholder="Tip"
              formControlName="surname"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>IBAN</mat-label>
            <input
              matInput
              type="text"
              placeholder="IT02L1234512345123456789012"
              formControlName="iban"
            >
          </mat-form-field>

          <div formGroupName="transferGroup" class="transfer-group"
               [ngClass]="{error: transferGroup?.errors?.['transfer'] && transferGroup?.touched}">
            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Importo</mat-label>
              <input
                matInput
                type="text"
                placeholder="100"
                formControlName="amount"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Seleziona una carta</mat-label>
              <mat-select formControlName="cardId" required>
                <mat-option *ngFor="let card of (cards$ | async)" [value]="card._id">
                  {{card.number}}
                </mat-option>
                <mat-option [value]="'zaq1xsw2cde3vfr4'">
                  0123456789012345 (FAKE)
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-error *ngIf="transferGroup?.errors?.['transfer'] && transferGroup?.touched">
              L'importo da trasferire e' <strong>superiore</strong> ai fondi disponibili sulla carta.
            </mat-error>
          </div>
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

    .transfer-group.error {
      //  TODO: How can I get the colors variable from Angular Material??
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
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    iban: ['', [Validators.required, ibanValidator]],
    transferGroup: this._fb.group({
      amount: ['', [Validators.required, amountValidator]],
      cardId: ['', [Validators.required], [this._cardIdValidator.validate()]]
    }, {
      asyncValidators: [this._transferValidator.validate({fieldCard: 'cardId', fieldAmount: 'amount'})],
      updateOn: 'blur'
    })
  });

  get name() {
    return this.transferForm.get('name')
  }

  get surname() {
    return this.transferForm.get('surname')
  }

  get iban() {
    return this.transferForm.get('iban')
  }

  get transferGroup() {
    return this.transferForm.get('transferGroup')
  }

  get amount() {
    return this.transferForm.get('transferGroup.amount')
  }

  get cardId() {
    return this.transferForm.get('transferGroup.cardId')
  }

  cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([])

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _transferService: TransferService,
    private _cardService: CardService,
    private _cardIdValidator: CardIdValidator,
    private _transferValidator: TransferValidator
  ) {
    this._cardService.getCards().subscribe(cards => {
      this.cards$.next(cards)
    })
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

      // Since we have an inner form group, we need to rearrange the data structure before its submission.
      const {name, surname, iban, transferGroup} = this.transferForm.value;
      const {amount, cardId} = transferGroup;
      const transferForm = {name, surname, iban, amount, cardId} as TransferForm

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

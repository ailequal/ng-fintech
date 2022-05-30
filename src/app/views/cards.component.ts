import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CardForm} from "../model/card";
import {MatDrawer} from "@angular/material/sidenav";
import {Card} from "../model/card";
import {CardFormComponent} from "./card-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ae-cards',
  template: `
    <mat-drawer-container class="container" autosize>
      <ae-card-list
        class="sidenav-content"
        [cards]="cards"
        (onReceipt)="receiptHandler($event)"
        (onDelete)="deleteHandler($event)"
        (onAdd)="addHandler()"
      >
      </ae-card-list>

      <mat-drawer #drawerRef class="sidenav" mode="over" position="end">
        <ae-card-form
          #cardFormRef
          (onSubmit)="submitHandler($event)"
          (onCancel)="cancelHandler()"
        >
        </ae-card-form>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    .container {
      min-height: 530px;
    }

    .sidenav-content {
    }

    .sidenav {
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .container {
        min-height: 460px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit {

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

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  @ViewChild('cardFormRef', {read: CardFormComponent, static: true}) cardForm!: CardFormComponent;

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  receiptHandler(card: Card): void {
    console.log(card)
    console.log('receiptHandler')
  }

  deleteHandler(card: Card): void {
    this.cards = this.cards.filter(element => {
      return element._id !== card._id
    })

    this._snackBar.open('Carta rimossa', '❌', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addHandler(): void {
    this.drawer.toggle().then(r => console.log(r))
  }

  submitHandler(cardForm: CardForm): void {
    // TODO: Some values are hard coded. Later on they will be provided from the backend.
    const newId = String(Date.now())
    const newCard: Card = {
      _id: newId,
      number: cardForm.cardNumber,
      ownerId: `u-${newId}`,
      owner: `${cardForm.name} ${cardForm.surname}`,
      type: cardForm.cardType,
      amount: 0
    }
    this.cards = [...this.cards, newCard]

    this._snackBar.open('Carta aggiunta', '❌', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });

    this.dispose()
  }

  cancelHandler(): void {
    this.dispose()
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
    this.cardForm.cleanUp()
  }

}

import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CardForm} from "../../models/card";
import {MatDrawer} from "@angular/material/sidenav";
import {Card} from "../../models/card";
import {CardFormComponent} from "./components/card-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Observable} from "rxjs";
import {CardService} from "../../api/card.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ae-cards',
  template: `
    <mat-drawer-container class="container" autosize>
      <ae-card-list
        class="sidenav-content"
        [cards]="cards$ | async"
        (onReceipt)="receiptHandler($event)"
        (onDelete)="deleteHandler($event)"
        (onAdd)="addHandler()"
      >
      </ae-card-list>

      <mat-drawer #drawerRef class="sidenav" mode="side" position="end">
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
      background-color: white;
    }

    .sidenav-content {
    }

    .sidenav {
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .container {
        min-height: 580px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit {

  cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([])

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  @ViewChild('cardFormRef', {read: CardFormComponent, static: true}) cardForm!: CardFormComponent;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _cardService: CardService
  ) {
  }

  ngOnInit(): void {
    this._cardService.getCards().subscribe(cards => {
      this.cards$.next(cards)
    })
  }

  receiptHandler(card: Card): void {
    // TODO: When navigating with this method, the active menu icon on the left part of the dashboard
    //  is displaying as active both /cards and /movements... It might help the option "skipLocationChange".
    this._router.navigateByUrl('/dashboard/movements/' + card._id).then(console.log)
  }

  deleteHandler(card: Card): void {
    this._cardService.deleteCard(card._id).subscribe(v => {
      if (!v) return

      this.cards$.next(
        this.cards$.value.filter(c => {
          return c._id !== card._id
        })
      )

      this._snackBar.open('Carta rimossa', '❌', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }

  addHandler(): void {
    this.drawer.toggle().then(r => console.log(r))
  }

  submitHandler(cardForm: CardForm): void {
    this._cardService.setCard(cardForm).subscribe(c => {

      this.cards$.next([...this.cards$.value, c])

      this._snackBar.open('Carta aggiunta', '❌', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });

      this.dispose()
    })
  }

  cancelHandler(): void {
    this.dispose()
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
    this.cardForm.cleanUp()
  }

}

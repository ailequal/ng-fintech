import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CardForm} from "../model/card-form";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'ae-cards',
  template: `
    <mat-drawer-container class="container" autosize>
      <ae-card-list
        class="sidenav-content"
        (onReceipt)="receiptHandler()"
        (onDelete)="deleteHandler()"
        (onAdd)="addHandler()"
      >
      </ae-card-list>

      <mat-drawer #drawer class="sidenav" mode="over" position="end">
        <ae-card-form
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

  @ViewChild('drawer', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  constructor() {
  }

  ngOnInit(): void {
  }

  receiptHandler(): void {
    console.log('receiptHandler')
  }

  deleteHandler(): void {
    console.log('deleteHandler')
  }

  addHandler(): void {
    this.drawer.toggle().then(r => console.log(r))
  }

  submitHandler(cardForm: CardForm): void {
    console.log(cardForm)
  }

  cancelHandler(): void {
    this.drawer.toggle().then(r => console.log(r))
  }

}

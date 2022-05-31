import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Contact} from "../model/contact";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <mat-form-field class="full-width" appearance="fill">
          <mat-label>Cerca</mat-label>
          <input matInput type="search">
        </mat-form-field>

        <div class="contacts-container">
          <h3 class="title">Contatti</h3>

          <mat-list class="contacts-list" role="list">
            <mat-list-item *ngFor="let contact of contacts;" role="listitem">
              <div class="contact">

                <div class="info">
                  <div class="left">
                    <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Account circle icon">
                      account_circle
                    </mat-icon>
                  </div>

                  <div class="right">
                    <div class="top">
                      <span class="contact-name-surname">{{contact.name + " " + contact.surname}}</span>
                    </div>
                    <div class="bottom">
                      <span class="contact-iban">{{contact.iban}}</span>
                    </div>
                  </div>
                </div>

                <mat-action-list class="actions">
                  <button
                    mat-list-item
                    (click)="onCheck.emit(contact)"
                    matTooltip="Seleziona"
                    matTooltipPosition="below"
                    matTooltipHideDelay="500"
                  >
                    <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Check icon">check</mat-icon>
                  </button>

                  <button
                    mat-list-item
                    (click)="onEdit.emit(contact)"
                    matTooltip="Modifica"
                    matTooltipPosition="below"
                    matTooltipHideDelay="500"
                  >
                    <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Edit icon">edit</mat-icon>
                  </button>

                  <button
                    mat-list-item
                    (click)="onDelete.emit(contact)"
                    matTooltip="Rimuovi"
                    matTooltipPosition="below"
                    matTooltipHideDelay="500"
                  >
                    <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Delete icon">delete</mat-icon>
                  </button>
                </mat-action-list>

              </div>
            </mat-list-item>
          </mat-list>
        </div>

        <mat-card-actions>
          <button class="full-width" mat-raised-button color="primary">Nuovo contatto</button>
        </mat-card-actions>

      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .contacts {
      max-width: 768px;
    }

    .contacts-container {
      padding: 10px 20px;
    }

    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .mat-list-base {
      padding-top: 0;
    }

    .contacts-list > .mat-list-item {
      height: 105px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .contacts-container .contact {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .contacts-container .contact > .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 30px;
      max-width: 400px;
      width: 100%;
    }

    .contacts-container .contact > .info > .left {
    }

    .contacts-container .contact > .info > .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
    }

    .contacts-container .contact > .info > .right > .bottom .contact-amount {
      font-weight: 700;
    }

    .contacts-container .contact > .actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 30px;
      padding: 0;
    }

    .full-width {
      width: 100%;
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .contacts-container > .mat-list-item {
        height: 48px;
      }

      .contacts-container .contact {
        flex-direction: row;
        align-items: center;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {

  // TODO: Hard coded values for now.
  contacts: Contact[] = [
    {
      _id: '4jug89hsgvh73',
      name: 'Mario',
      surname: 'Mario',
      iban: 'IT02L1234512345123456789013'
    },
    {
      _id: '4jug89hsgvh74',
      name: 'Luigi',
      surname: 'Mario',
      iban: 'IT02L1234512345123456789014'
    },
  ];

  @Output() onCheck: EventEmitter<Contact> = new EventEmitter<Contact>()

  @Output() onEdit: EventEmitter<Contact> = new EventEmitter<Contact>()

  @Output() onDelete: EventEmitter<Contact> = new EventEmitter<Contact>()

  constructor() {
  }

  ngOnInit(): void {
  }

}

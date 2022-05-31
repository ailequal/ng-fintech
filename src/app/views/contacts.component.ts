import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact, ContactForm} from "../model/contact";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ng-container *ngIf="true">
          <ae-contact-list
            [contacts]="contacts"
            (onCheck)="checkHandler($event)"
            (onEdit)="editHandler($event)"
            (onDelete)="deleteHandler($event)"
          ></ae-contact-list>

          <mat-card-actions>
            <button class="full-width" mat-raised-button color="primary">Nuovo contatto</button>
          </mat-card-actions>
        </ng-container>

        <ng-container *ngIf="true">
          <mat-card-actions>
            <button class="full-width" mat-stroked-button>Indietro</button>
          </mat-card-actions>

          <ae-contact-form
            (onSubmit)="submitHandler($event)"
          ></ae-contact-form>
        </ng-container>

      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .contacts {
      max-width: 768px;
    }

    .full-width {
      width: 100%;
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
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  checkHandler(contactId: string) {
    console.log(contactId)
  }

  editHandler(contactId: string) {
    console.log(contactId)
  }

  deleteHandler(contactId: string) {
    console.log(contactId)
  }

  submitHandler(contactForm: ContactForm) {
    console.log(contactForm)
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact, ContactForm} from "../model/contact";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ng-container *ngIf="show === 'contact-list'">
          <ae-contact-list
            [contacts]="contacts"
            (onCheck)="checkHandler($event)"
            (onEdit)="editHandler($event)"
            (onDelete)="deleteHandler($event)"
          ></ae-contact-list>

          <mat-card-actions>
            <button
              class="full-width"
              mat-raised-button
              color="primary"
              (click)="show = 'contact-form'; selectedContact = null;"
            >
              Nuovo contatto
            </button>
          </mat-card-actions>
        </ng-container>

        <ng-container *ngIf="show === 'contact-form'">
          <mat-card-actions>
            <button
              class="full-width"
              mat-stroked-button
              (click)="show = 'contact-list'"
            >
              Indietro
            </button>
          </mat-card-actions>

          <ae-contact-form
            [initialContact]="selectedContact"
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

  show: 'contact-list' | 'contact-form' = 'contact-list'

  selectedContact: Contact | null = null

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
    const selectedContact = this.contacts.find(element => {
      return element._id === contactId
    })

    if (!selectedContact) {
      this.resetState()
      return
    }

    this.selectedContact = selectedContact
    this.show = "contact-form"
  }

  deleteHandler(contactId: string) {
    this.contacts = this.contacts.filter(element => {
      return element._id !== contactId
    })
  }

  submitHandler(contactForm: ContactForm) {
    if (this.selectedContact) {
      // Edit the already existing contact.
      this.contacts = this.contacts.map(element => {
        if (element._id !== this.selectedContact?._id)
          return element

        return {...element, ...contactForm}
      })

      this.resetState()
      return
    }

    // Add a new contact.
    this.contacts = [...this.contacts, {_id: String(Date.now()), ...contactForm}]
    this.resetState()
  }

  resetState() {
    this.selectedContact = null
    this.show = "contact-list"
  }

}

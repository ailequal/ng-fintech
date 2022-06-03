import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact, ContactForm} from "../../../models/contact";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ContactService} from "../../../api/contact.service";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ng-container *ngIf="show === 'contact-list'">
          <ae-contact-list
            [contacts]="contacts$ | async"
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
  // changeDetection: ChangeDetectionStrategy.OnPush // TODO: We might not be able to use it in this component, at least for now.
})
export class ContactsComponent implements OnInit {

  show: 'contact-list' | 'contact-form' = 'contact-list'

  contacts$: Observable<Contact[]> = this._contactService.getContacts()

  selectedContact: Contact | null = null

  constructor(
    public dialogRef: MatDialogRef<ContactsComponent>,
    private _contactService: ContactService
  ) {
  }

  ngOnInit(): void {
  }

  checkHandler(selectedContact: Contact) {
    // Send the selected contact back to the "original" component (this is a dialog window).
    this.dialogRef.close(selectedContact)
  }

  editHandler(selectedContact: Contact) {
    // Open the edit contact window with the relative data already filled.
    this.selectedContact = selectedContact
    this.show = "contact-form"
  }

  deleteHandler(contactId: string) {
    this._contactService.deleteContact(contactId).subscribe(v => {
      console.log(v)

      this.contacts$ = this._contactService.getContacts() // TODO: Manually re-trigger the subscription for now.
    })
  }

  submitHandler(contactForm: ContactForm) {
    if (this.selectedContact) {
      // Update the already existing contact.
      this._contactService.updateContact(this.selectedContact._id, contactForm).subscribe(v => {
        console.log(v)

        this.contacts$ = this._contactService.getContacts() // TODO: Manually re-trigger the subscription for now.
        this.resetState()
      })

      return
    }

    // Add a new contact.
    this._contactService.setContact(contactForm).subscribe(v => {
      console.log(v)

      this.contacts$ = this._contactService.getContacts() // TODO: Manually re-trigger the subscription for now.
      this.resetState()
    })
  }

  resetState() {
    this.selectedContact = null
    this.show = "contact-list"
  }

}

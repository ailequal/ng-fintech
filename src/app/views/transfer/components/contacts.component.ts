import {Component, OnInit} from '@angular/core';
import {Contact, ContactForm, ContactsComponentState} from "../../../models/contact";
import {MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {ContactService} from "../../../api/contact.service";
import {Store} from "@ngrx/store";
import {loadContacts} from "../../../store/actions/contacts.actions";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ng-container *ngIf="(state$ | async)?.type === 'list'">
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
              (click)="state$.next({type: 'new'})"
            >
              Nuovo contatto
            </button>
          </mat-card-actions>
        </ng-container>

        <ng-container *ngIf="(state$ | async)?.type !== 'list'">
          <mat-card-actions>
            <button
              class="full-width"
              mat-stroked-button
              (click)="state$.next({type: 'list'})"
            >
              Indietro
            </button>
          </mat-card-actions>

          <ae-contact-form
            [initialContact]="selectedContact$ | async"
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

  contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([])

  state$: BehaviorSubject<ContactsComponentState> = new BehaviorSubject<ContactsComponentState>({type: 'list'})

  selectedContact$: Observable<Contact | null> = combineLatest([this.contacts$, this.state$]).pipe(
    map(combinedValues => {
      const [contacts, state] = combinedValues
      if (!contacts.length || 'edit' !== state.type || !state.id)
        return null

      const contactId = state.id
      const contact = contacts.find(element => {
        return element._id === contactId
      })

      return contact ? contact : null
    })
  )

  constructor(
    private _store: Store,
    public dialogRef: MatDialogRef<ContactsComponent>,
    private _contactService: ContactService
  ) {
    this._contactService.getContacts().subscribe(contacts => {
      this.contacts$.next(contacts)
    });
  }

  ngOnInit(): void {
    this._store.dispatch(loadContacts());
  }

  checkHandler(selectedContact: Contact) {
    // Send the selected contact back to the "original" component (this is a dialog window).
    this.dialogRef.close(selectedContact)
  }

  editHandler(selectedContact: Contact) {
    // Open the edit contact window with the relative data already filled.
    this.state$.next({type: "edit", id: selectedContact._id})
  }

  deleteHandler(contactId: string) {
    this._contactService.deleteContact(contactId).subscribe(v => {
      this.contacts$.next(
        this.contacts$.value.filter(contact => {
          return contact._id !== contactId
        })
      )
    })
  }

  submitHandler(contactForm: ContactForm) {
    if (this.state$.value.type === 'edit') {
      // Update the already existing contact.
      const contactId = this.state$.value.id
      if (!contactId)
        return

      this._contactService.updateContact(contactId, contactForm).subscribe(updatedContact => {
        this.contacts$.next(this.contacts$.value.map(contact => {
          return (contact._id === updatedContact._id) ? updatedContact : contact
        }))
      })

      this.resetState()

      return
    }

    // Add a new contact.
    this._contactService.setContact(contactForm).subscribe(newContact => {
      this.contacts$.next([...this.contacts$.value, newContact])

      this.resetState()
    })
  }

  resetState() {
    this.state$.next({type: "list"})
  }

}

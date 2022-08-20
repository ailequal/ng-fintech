import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact, ContactForm, ContactsComponentState} from "../../../models/contact";
import {MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {ContactService} from "../../../api/contact.service";
import {Store} from "@ngrx/store";
import {deleteContact, loadContacts, setContact, updateContact} from "../../../store/actions/contacts.actions";
import {selectContactsAll} from "../../../store/selectors/contacts.selectors";

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {

  contacts$: Observable<Contact[]> = this._store.select(selectContactsAll);

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
    this._store.dispatch(deleteContact({contactId: contactId}));
  }

  submitHandler(contactForm: ContactForm) {
    if (this.state$.value.type === 'edit') {
      // Update the already existing contact.
      const contactId = this.state$.value.id
      if (!contactId)
        return

      this._store.dispatch(updateContact({contactId: contactId, contact: contactForm}));
      this.resetState();

      return
    }

    // Add a new contact.
    this._store.dispatch(setContact({contact: contactForm}));
    this.resetState();
  }

  resetState() {
    // TODO: This method is always called right after a store dispatch, which is asynchronous (calls external API).
    //  To correctly executed this method right after the first dispatch, we should rely on NgRx
    //  by storing inside the state this property. If all the UI state is saved, everything can be easily
    //  replicated and debugged! For now it's gonna be fine in this easier way: no matter the outcome of the action
    //  from the API (success or failure), we will always go back to the previous component view state.
    //  P.S. What about triggering a notification depending on the action result??
    this.state$.next({type: "list"});
  }

}

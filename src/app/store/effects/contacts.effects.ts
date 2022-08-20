import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ContactService} from "../../api/contact.service";
import {
  deleteContact, deleteContactFailure, deleteContactSuccess,
  loadContacts,
  loadContactsFailure,
  loadContactsSuccess,
  setContact, setContactFailure,
  setContactSuccess, updateContact, updateContactFailure, updateContactSuccess
} from "../actions/contacts.actions";
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactsEffects {

  constructor(
    private _actions$: Actions,
    private _contactService: ContactService
  ) {
  }

  loadContacts$ = createEffect(() => this._actions$.pipe(
    ofType(loadContacts),
    mergeMap(() => this._contactService.getContacts()
      .pipe(
        map(contacts => (loadContactsSuccess({contacts: contacts}))),
        catchError(err => of(loadContactsFailure()))
      ))
  ));

  setContact$ = createEffect(() => this._actions$.pipe(
    ofType(setContact),
    mergeMap((action) => this._contactService.setContact(action.contact)
      .pipe(
        map(contact => (setContactSuccess({contact: contact}))),
        catchError(err => of(setContactFailure()))
      )
    )
  ));

  updateContact$ = createEffect(() => this._actions$.pipe(
    ofType(updateContact),
    mergeMap((action) => this._contactService.updateContact(action.contactId, action.contact)
      .pipe(
        map(contact => (updateContactSuccess({contact: contact}))),
        catchError(err => of(updateContactFailure()))
      )
    )
  ));

  deleteContact$ = createEffect(() => this._actions$.pipe(
    ofType(deleteContact),
    mergeMap((action) => this._contactService.deleteContact(action.contactId)
      .pipe(
        map(deleteStatus => (deleteContactSuccess({contactId: action.contactId}))),
        catchError(err => of(deleteContactFailure()))
      )
    )
  ));

}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ContactService} from "../../api/contact.service";
import {loadContacts, loadContactsFailure, loadContactsSuccess} from "../actions/contacts.actions";
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

}

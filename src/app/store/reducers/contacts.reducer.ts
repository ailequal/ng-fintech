import {ContactsState} from "../../models/state";
import {contactsAdapter} from "../adapters/contacts.adapter";
import {createReducer, on} from "@ngrx/store";
import {loadContactsFailure, loadContactsSuccess} from "../actions/contacts.actions";

const contactsInitialState: ContactsState = contactsAdapter.getInitialState();
export const contactsReducer = createReducer<ContactsState>(
  contactsInitialState,
  on(loadContactsSuccess, (state, action) => contactsAdapter.setAll(action.contacts, state)),
  on(loadContactsFailure, (state, action) => contactsAdapter.removeAll({...state}))
);

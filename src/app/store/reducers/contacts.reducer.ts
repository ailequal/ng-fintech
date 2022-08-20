import {ContactsState} from "../../models/state";
import {contactsAdapter} from "../adapters/contacts.adapter";
import {createReducer, on} from "@ngrx/store";
import {
  deleteContactSuccess,
  loadContactsFailure,
  loadContactsSuccess,
  setContactSuccess, updateContactSuccess
} from "../actions/contacts.actions";

const contactsInitialState: ContactsState = contactsAdapter.getInitialState();
export const contactsReducer = createReducer<ContactsState>(
  contactsInitialState,
  on(loadContactsSuccess, (state, action) => contactsAdapter.setAll(action.contacts, state)),
  on(loadContactsFailure, (state, action) => contactsAdapter.removeAll({...state})),
  on(setContactSuccess, (state, action) => contactsAdapter.setOne(action.contact, state)),
  on(updateContactSuccess, (state, action) => contactsAdapter.updateOne({
    id: action.contact._id,
    changes: action.contact
  }, state)),
  on(deleteContactSuccess, (state, action) => contactsAdapter.removeOne(action.contactId, state))
);

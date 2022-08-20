import {createAction, props} from "@ngrx/store";
import {Contact, ContactForm} from "../../models/contact";

export const loadContacts = createAction('[Contacts] Load contacts');
export const loadContactsSuccess = createAction(
  '[Contacts] Load contacts success',
  props<{ contacts: Contact[] }>()
);
export const loadContactsFailure = createAction('[Contacts] Load contacts failure');

export const setContact = createAction(
  '[Contacts] Set contact',
  props<{ contact: ContactForm }>()
);

export const updateContact = createAction(
  '[Contacts] Update contact',
  props<{ contactId: string, contact: Partial<Contact> }>()
);

export const deleteContact = createAction(
  '[Contacts] Delete contact',
  props<{ contactId: string }>()
);

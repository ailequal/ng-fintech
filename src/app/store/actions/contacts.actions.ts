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
export const setContactSuccess = createAction(
  '[Contacts] Set contact success',
  props<{ contact: Contact }>()
);
export const setContactFailure = createAction('[Contacts] Set contact failure');

export const updateContact = createAction(
  '[Contacts] Update contact',
  props<{ contactId: string, contact: Partial<Contact> }>()
);
export const updateContactSuccess = createAction(
  '[Contacts] Update contact success',
  props<{ contact: Contact }>()
);
export const updateContactFailure = createAction('[Contacts] Update contact failure');

export const deleteContact = createAction(
  '[Contacts] Delete contact',
  props<{ contactId: string }>()
);
export const deleteContactSuccess = createAction(
  '[Contacts] Delete contact success',
  props<{ contactId: string }>()
);
export const deleteContactFailure = createAction('[Contacts] Delete contact failure');

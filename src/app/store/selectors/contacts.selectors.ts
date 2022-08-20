import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ContactsState} from "../../models/state";
import {contactsAdapter} from "../adapters/contacts.adapter";

export const selectContactsState = createFeatureSelector<ContactsState>('contacts');

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = contactsAdapter.getSelectors();

export const selectContactsAll = createSelector(
  selectContactsState,
  selectAll
);

export const selectContactsEntities = createSelector(
  selectContactsState,
  selectEntities
);

export const selectContactsIds = createSelector(
  selectContactsState,
  selectIds
);

export const selectContactsTotal = createSelector(
  selectContactsState,
  selectTotal
);

export const selectContact = (contactId: string) => {
  return createSelector(
    selectContactsEntities,
    contacts => contacts[contactId] ?? null
  );
};

import {EntityState} from "@ngrx/entity";
import {Contact} from "./contact";

export interface AppState {
  contacts: ContactsState
}

export interface ContactsState extends EntityState<Contact> {
}

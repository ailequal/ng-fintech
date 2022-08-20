import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../../models/state";
import {contactsReducer} from "./contacts.reducer";

export const reducers: ActionReducerMap<AppState> = {
  contacts: contactsReducer
};

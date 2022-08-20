// Logs all the actions related to contacts.
import {ActionReducer} from "@ngrx/store";

export function debugContacts(reducer: ActionReducer<any>): ActionReducer<any> {
  const actionsWhiteList = [
    '[Contacts] Load contacts',
    '[Contacts] Load contacts success',
    '[Contacts] Load contacts failure',
    '[Contacts] Set contact',
    '[Contacts] Update contact',
    '[Contacts] Delete contact'
  ];

  return function (state, action) {
    if (!actionsWhiteList.includes(action.type))
      return reducer(state, action);

    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

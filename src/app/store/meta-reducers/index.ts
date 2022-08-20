import {MetaReducer} from "@ngrx/store";
import {environment} from "../../../environments/environment";
import {debugAll} from "./debug-all.meta-reducer";
import {debugContacts} from "./debug-contacts.meta-reducer";

// Meta reducers can be used for debugging, but also for other tasks even in production, if needed.
export const metaReducers: MetaReducer<any>[] = !environment.production ? [
  // debugAll,
  debugContacts
] : [];

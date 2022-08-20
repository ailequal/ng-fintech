import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {Contact} from "../../models/contact";

const selectContactId = (contact: Contact) => {
  return contact._id;
}

// TODO: Correctly sort by alphabetic name.
// const sortByName = (c1: Contact, c2: Contact) => {
//   return c1.name - c2.name;
// }

export const contactsAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>({
  selectId: selectContactId,
  // sortComparer: sortByName
})

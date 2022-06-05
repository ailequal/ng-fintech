export interface Contact {
  _id: string;
  name: string;
  surname: string;
  iban: string;
}

export interface ContactForm {
  name: string;
  surname: string;
  iban: string;
}

export interface ContactsComponentState {
  type: 'list' | 'new' | 'edit',
  id?: string
}

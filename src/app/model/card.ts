export type CardType = 'mastercard' | 'visa';

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: CardType;
  amount: number;
}

export interface CardForm {
  cardType: CardType;
  name: string;
  surname: string;
  cardNumber: string;
  cardSecurityCode: string;
}

import {Movement} from "./movement";

export type CardType = 'mastercard' | 'visa';

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: CardType;
  amount: number;
  movements?: Movement[]
}

export interface CardForm {
  number: string;
  type: CardType;
  csc: string;
  name: string;
  surname: string;
}

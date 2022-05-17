export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: 'mastercard' | 'visa';
  amount: number;
}

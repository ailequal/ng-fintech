export interface CardForm {
  cardType: 'mastercard' | 'visa';
  name: string;
  surname: string;
  cardNumber: string;
  cardSecurityCode: string;
}

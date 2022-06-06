import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EqualFieldsValidatorDirective} from "./equal-fields.validator";
import {AmountValidatorDirective} from "./amount.validator";
import {IbanValidatorDirective} from "./iban.validator";
import {CodiceFiscaleValidatorDirective} from "./codice-fiscale.validator";
import {CardIdValidatorDirective} from "./card-id.validator";
import {TransferValidatorDirective} from "./transfer.validator";
import {DateFromToValidatorDirective} from "./date-from-to";

@NgModule({
  declarations: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    CodiceFiscaleValidatorDirective,
    CardIdValidatorDirective,
    TransferValidatorDirective,
    DateFromToValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    CodiceFiscaleValidatorDirective,
    CardIdValidatorDirective,
    TransferValidatorDirective,
    DateFromToValidatorDirective
  ]
})
export class ValidatorsModule {
}

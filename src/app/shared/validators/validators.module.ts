import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EqualFieldsValidatorDirective} from "./equal-fields.validator";
import {AmountValidatorDirective} from "./amount.validator";
import {IbanValidatorDirective} from "./iban.validator";
import {CodiceFiscaleValidatorDirective} from "./codice-fiscale.validator";
import {CardIdValidatorDirective} from "./card-id.validator";
import {TransferValidatorDirective} from "./transfer.validator";

@NgModule({
  declarations: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    CodiceFiscaleValidatorDirective,
    CardIdValidatorDirective,
    TransferValidatorDirective
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
    TransferValidatorDirective
  ]
})
export class ValidatorsModule {
}

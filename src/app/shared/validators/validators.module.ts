import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EqualFieldsValidatorDirective} from "./equal-fields.validator";
import {AmountValidatorDirective} from "./amount.validator";
import {IbanValidatorDirective} from "./iban.validator";
import {CodiceFiscaleValidatorDirective} from "./codice-fiscale.validator";

@NgModule({
  declarations: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    CodiceFiscaleValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    CodiceFiscaleValidatorDirective
  ]
})
export class ValidatorsModule {
}

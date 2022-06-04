import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EqualFieldsValidatorDirective} from "./equal-fields.validator";
import {AmountValidatorDirective} from "./amount.validator";

@NgModule({
  declarations: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective
  ]
})
export class ValidatorsModule {
}

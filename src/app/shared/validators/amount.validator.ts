import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validators} from "@angular/forms";
import {Directive} from "@angular/core";

export const amountValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = parseInt(control.value)

  return (value && value <= 50) ? {amount: true} : null
}

@Directive({
  selector: '[amountValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AmountValidatorDirective,
    multi: true
  }]
})
export class AmountValidatorDirective implements Validators {

  validate(control: AbstractControl): ValidationErrors | null {
    return amountValidator(control)
  }

}

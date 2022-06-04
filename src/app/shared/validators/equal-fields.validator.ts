import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Directive, Input} from "@angular/core";

// Real validation check (the common part).
const equalFieldsValidator = (control: AbstractControl, fields: [string, string]): ValidationErrors | null => {
  const fieldAlpha = control.get(fields[0]);
  const fieldBeta = control.get(fields[1]);

  return (fieldAlpha && fieldBeta && fieldAlpha.value !== fieldBeta.value) ? {equalFields: true} : null;
}

// Factory function for reactive forms.
export const equalFieldsValidatorReactive = (fields: [string, string]): ValidatorFn => {
  // Real validator function for reactive forms.
  return (control: AbstractControl): ValidationErrors | null => {
    return equalFieldsValidator(control, fields)
  }
};

@Directive({
  selector: '[equalFieldsValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualFieldsValidatorDirective,
    multi: true
  }]
})
export class EqualFieldsValidatorDirective implements Validators {

  @Input() public equalFieldsValidator: [string, string] = ['', ''];

  // Factory function for template driven forms.
  validate(control: AbstractControl): ValidationErrors | null {
    // Real validator function for template driven forms.
    return (): ValidationErrors | null => {
      return equalFieldsValidator(control, this.equalFieldsValidator)
    }
  }

}

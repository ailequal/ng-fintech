import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Directive, Input} from "@angular/core";

// Real validation check (the common part).
const dateFromToValidator = (control: AbstractControl, fields: { fieldFrom: string, fieldTo: string }): ValidationErrors | null => {
  const fieldFrom = control.get(fields.fieldFrom);
  const fieldTo = control.get(fields.fieldTo);

  if (!fieldFrom || !fieldTo || !fieldFrom.value || !fieldTo.value)
    return null

  const dateFrom = fieldFrom.value
  const dateTo = fieldTo.value

  return dateFrom >= dateTo ? {dateFromTo: true} : null
}

// Factory function for reactive forms.
export const dateFromToValidatorReactive = (fields: { fieldFrom: string, fieldTo: string }): ValidatorFn => {
  // Real validator function for reactive forms.
  return (control: AbstractControl): ValidationErrors | null => {
    return dateFromToValidator(control, fields)
  }
};

@Directive({
  selector: '[dateFromToValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateFromToValidatorDirective,
    multi: true
  }]
})
export class DateFromToValidatorDirective implements Validators {

  @Input() public dateFromToValidator: { fieldFrom: string, fieldTo: string } = {fieldFrom: '', fieldTo: ''};

  // Factory function for template driven forms.
  validate(control: AbstractControl): ValidationErrors | null {
    // Real validator function for template driven forms.
    return (): ValidationErrors | null => {
      return dateFromToValidator(control, this.dateFromToValidator)
    }
  }

}

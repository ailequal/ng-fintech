import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validators} from "@angular/forms";
import {Directive} from "@angular/core";

// Real validation check (the common part)
// Used by reactive forms as it is; called from a directive for the template driven forms.
export const codiceFiscaleValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value)
    return null

  // Only the correct codice fiscale scheme is allowed.
  // @link http://blog.marketto.it/2016/01/regex-validazione-codice-fiscale-con-omocodia
  const codiceFiscaleRegex = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i;
  if (!codiceFiscaleRegex.test(control.value))
    return {codiceFiscale: true}

  return null;
}

@Directive({
  selector: '[codiceFiscaleValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CodiceFiscaleValidatorDirective,
    multi: true
  }]
})
export class CodiceFiscaleValidatorDirective implements Validators {

  validate(control: AbstractControl): ValidationErrors | null {
    return codiceFiscaleValidator(control)
  }

}

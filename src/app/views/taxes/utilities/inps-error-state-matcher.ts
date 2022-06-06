import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class InpsErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('dateFromTo');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }

}

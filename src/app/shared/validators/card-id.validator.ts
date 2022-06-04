import {Directive, Injectable} from "@angular/core";
import {
  AbstractControl, AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Card} from "../../models/card";
import {CardService} from "../../api/card.service";

// Real validation async check through a specific service.
// Used by reactive forms as it is; called from a directive for the template driven forms.
@Injectable({providedIn: 'root'})
export class CardIdValidator {

  constructor(private _cardService: CardService) {
  }

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this._cardService.getCards().pipe(
        map((v: Card[]) => {
          if (!control.value)
            return null

          const cardId = control.value as string

          const card = v.find(element => {
            return element._id === cardId
          })

          return !card ? {cardId: true} : null
        })
      );
    }
  }

}

@Directive({
  selector: '[cardIdValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: CardIdValidatorDirective,
    multi: true
  }]
})
export class CardIdValidatorDirective implements AsyncValidator {

  constructor(private _cardIdValidator: CardIdValidator) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._cardIdValidator.validate()(control)
  }

}

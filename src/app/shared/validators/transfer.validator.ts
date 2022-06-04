import {Directive, Injectable, Input} from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {Card} from "../../models/card";
import {CardService} from "../../api/card.service";

// Real validation async check through a specific service.
// Used by reactive forms as it is; called from a directive for the template driven forms.
@Injectable({providedIn: 'root'})
export class TransferValidator {

  constructor(private _cardService: CardService) {
  }

  validate(fields: { fieldCard: string, fieldAmount: string }): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const fieldCard = control.get(fields.fieldCard);
      const fieldAmount = control.get(fields.fieldAmount);

      console.log(fieldCard, fieldAmount)

      if (!fieldCard || !fieldAmount)
        return of(null)

      const cardId = fieldCard.value as string
      const amount = parseFloat(fieldAmount.value)

      return this._cardService.getCards().pipe(
        map((v: Card[]) => {
          const transferCheck = v.some(element => {
            if (element._id !== cardId)
              return false

            return element.amount >= amount
          })

          return !transferCheck ? {transfer: true} : null
        })
      );
    }
  }

}

@Directive({
  selector: '[transferValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: TransferValidatorDirective,
    multi: true
  }]
})
export class TransferValidatorDirective implements AsyncValidator {

  @Input() public transferValidator: { fieldCard: string, fieldAmount: string } = {fieldCard: '', fieldAmount: ''};

  constructor(private _transferValidator: TransferValidator) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._transferValidator.validate(this.transferValidator)(control)
  }

}

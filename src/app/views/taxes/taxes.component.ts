import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSelectChange} from "@angular/material/select";
import {codiceFiscaleValidator} from "../../shared/validators/codice-fiscale.validator";
import {dateFromToValidatorReactive} from "../../shared/validators/date-from-to";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaxService} from "../../api/tax.service";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {isObject} from "../../shared/utilities/is-object";
import {InpsErrorStateMatcher} from './utilities/inps-error-state-matcher';

@Component({
  selector: 'ae-taxes',
  template: `
    <form class="taxes-form" [formGroup]="taxesForm">
      <mat-card class="taxes-form">

        <mat-card-header>
          <mat-card-title class="title">Contribuente</mat-card-title>
        </mat-card-header>

        <mat-card-content>

          <div class="taxpayer" formGroupName="taxpayer">
            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Codice fiscale</mat-label>
              <input
                matInput
                type="text"
                placeholder="RSSMRA80A01F205X"
                formControlName="codiceFiscale"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Cognome</mat-label>
              <input
                matInput
                type="text"
                placeholder="Tip"
                formControlName="surname"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Nome</mat-label>
              <input
                matInput
                type="text"
                placeholder="Lucas"
                formControlName="name"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Data di nascita</mat-label>
              <input
                matInput
                [matDatepicker]="birthDateRef"
                formControlName="birthDate"
                (dateChange)="birthDateChangeHandler($event)"
              >
              <mat-datepicker-toggle matSuffix [for]="birthDateRef"></mat-datepicker-toggle>
              <mat-datepicker #birthDateRef></mat-datepicker>
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Sesso</mat-label>
              <mat-select (selectionChange)="genderHandler($event)" formControlName="gender">
                <mat-option [value]="'male'">Maschio</mat-option>
                <mat-option [value]="'female'">Femmina</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Provincia di nascita</mat-label>
              <input
                matInput
                type="text"
                formControlName="birthProvince"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Comune di nascita</mat-label>
              <input
                matInput
                type="text"
                formControlName="birthCity"
              >
            </mat-form-field>
          </div>

          <div class="treasuries container" formArrayName="treasuries">
            <h2 class="title">Erario</h2>

            <div *ngFor="let treasury of treasuries.controls; index as i" [formGroupName]="i" class="row">
              <div class="flex">
                <mat-form-field appearance="fill">
                  <mat-label>Codice tributo</mat-label>
                  <input
                    matInput
                    type="text"
                    formControlName="taxCode"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Anno di riferimento</mat-label>
                  <input
                    matInput
                    type="number"
                    formControlName="referenceYear"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Importo a debito</mat-label>
                  <input
                    matInput
                    type="number"
                    formControlName="dueAmount"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Importo a credito</mat-label>
                  <input
                    matInput
                    type="number"
                    formControlName="creditAmount"
                  >
                </mat-form-field>

                <button (click)="treasuryDeleteHandler(treasury, i, $event)" mat-mini-fab color="warn"
                        aria-label="Delete icon" type="button">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <div class="status flex">
              <h3>Totale a debito: {{(treasuriesTotal$ | async)?.dueAmount | currency: 'EUR'}}</h3>
              <h3>Totale a credito: {{(treasuriesTotal$ | async)?.creditAmount | currency: 'EUR'}}</h3>
            </div>

            <button (click)="treasuryAddHandler($event)" mat-mini-fab color="primary" aria-label="Add icon"
                    type="button">
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <div class="inpses container" formArrayName="inpses">
            <h2 class="title">INPS</h2>

            <div *ngFor="let inps of inpses.controls; index as i" [formGroupName]="i" class="row">
              <div class="flex">
                <mat-form-field appearance="fill">
                  <mat-label>Codice sede</mat-label>
                  <input
                    matInput
                    type="text"
                    formControlName="headquartersCode"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Causale contributo</mat-label>
                  <input
                    matInput
                    type="text"
                    formControlName="causal"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Codice INPS</mat-label>
                  <input
                    matInput
                    type="text"
                    formControlName="inpsCode"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Da</mat-label>
                  <input
                    matInput
                    [matDatepicker]="dateFromRef"
                    formControlName="dateFrom"
                    (dateChange)="dateFromChangeHandler(inps, i, $event)"
                    [errorStateMatcher]="inpsMatcher"
                  >
                  <mat-datepicker-toggle matSuffix [for]="dateFromRef"></mat-datepicker-toggle>
                  <mat-datepicker #dateFromRef></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>A</mat-label>
                  <input
                    matInput
                    [matDatepicker]="dateToRef"
                    formControlName="dateTo"
                    (dateChange)="dateToChangeHandler(inps, i, $event)"
                    [errorStateMatcher]="inpsMatcher"
                  >
                  <mat-datepicker-toggle matSuffix [for]="dateToRef"></mat-datepicker-toggle>
                  <mat-datepicker #dateToRef></mat-datepicker>

                  <mat-error *ngIf="inps.hasError('dateFromTo')">
                    Intervallo date incorretto.
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Debito</mat-label>
                  <input
                    matInput
                    type="number"
                    formControlName="debt"
                  >
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Credito</mat-label>
                  <input
                    matInput
                    type="number"
                    formControlName="credit"
                  >
                </mat-form-field>

                <button (click)="inpsDeleteHandler(inps, i, $event)" mat-mini-fab color="warn" aria-label="Delete icon"
                        type="button">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <div class="status flex">
              <h3>Totale a debito: {{(inpsesTotal$ | async)?.debt | currency: 'EUR'}}</h3>
              <h3>Totale a credito: {{(inpsesTotal$ | async)?.credit | currency: 'EUR'}}</h3>
            </div>

            <button (click)="inpsAddHandler($event)" mat-mini-fab color="primary" aria-label="Add icon" type="button">
              <mat-icon>add</mat-icon>
            </button>
          </div>

        </mat-card-content>

        <mat-card-actions align="end">
          <div class="submit container">
            <h3 *ngIf="(totals$ | async) || true as totals">
              Saldo totale:
              <span [ngClass]="{credit: totals && totals >=0, debt: totals && totals < 0}">
                {{totals$ | async | currency: 'EUR'}}
              </span>
            </h3>

            <button (click)="submitHandler()" class="mb" mat-raised-button [disabled]="!taxesForm.valid" color="primary"
                    type="button">
              Invia
            </button>
          </div>
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .taxes-form {
      min-width: 120px;
    }

    .mat-card-title.title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.54);
    }

    .container {
      margin: 25px 0;
      border-radius: 5px;
      padding: 20px;
      background-color: #f8f9fa;
    }

    .submit.container h3 {
      font-weight: 700;
    }

    .submit.container h3 span.credit {
      color: green;
    }

    .submit.container h3 span.debt {
      color: red;
    }

    .container > .title {
      margin-bottom: 25px;
    }

    .container .row > .flex {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 20px;
      overflow-y: scroll;
    }

    .container button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .treasuries .status,
    .inpses .status {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 40px;
    }

    .treasuries .status h3,
    .inpses .status h3 {
      display: inline-block;
    }

    .mat-card-actions .mat-raised-button {
      margin: 0 10px 0 10px;
    }

    .mat-card-actions .mat-raised-button.mb {
      margin-bottom: 20px;
    }

    .full-width {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxesComponent implements OnInit {

  // TODO: Refactor with ControlValueAccessor this form for taxpayer, treasuries and inpses (the component is too long)!!
  // TODO: Add modal window before submitting the form value where the user can choose which card for the payment.
  // TODO: The input birthProvince will be based on "https://github.com/matteocontrini/comuni-json" with an autocomplete
  //  input from Angular Material. Also add a custom validator for any user typo.
  // TODO: Add even more inputs based on the F24 document.
  // TODO: Prettify the form interface.

  @ViewChild('birthDateRef', {read: MatDatepicker, static: true}) birthDateMat!: MatDatepicker<any>;

  @ViewChild('dateFromRef', {read: MatDatepicker, static: true}) dateFromMat!: MatDatepicker<any>;

  @ViewChild('dateToRef', {read: MatDatepicker, static: true}) dateToMat!: MatDatepicker<any>;

  taxpayerControlsModel: { [key: string]: Object[] } = {
    codiceFiscale: ['', [Validators.required, codiceFiscaleValidator]],
    surname: ['', [Validators.required]],
    name: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthProvince: ['', [Validators.required]],
    birthCity: ['', [Validators.required]]
  }

  treasuriesControlsModel: { [key: string]: Object[] } = {
    taxCode: ['', [Validators.required]],
    referenceYear: ['', [Validators.required]],
    dueAmount: ['', [Validators.required]],
    creditAmount: ['', [Validators.required]]
  }

  inpsesControlsModel: { [key: string]: Object[] } = {
    headquartersCode: ['', [Validators.required]],
    causal: ['', [Validators.required]],
    inpsCode: ['', [Validators.required]],
    dateFrom: ['', [Validators.required]],
    dateTo: ['', [Validators.required]],
    debt: ['', [Validators.required]],
    credit: ['', [Validators.required]]
  }

  inpsesOptionsModel: { [key: string]: Object[] } = {
    validators: [dateFromToValidatorReactive({fieldFrom: 'dateFrom', fieldTo: 'dateTo'})]
  }

  taxesForm = this._fb.group({
    taxpayer: this._fb.group(this.taxpayerControlsModel),
    treasuries: this._fb.array([
      this._fb.group(this.treasuriesControlsModel)
    ]),
    inpses: this._fb.array([
      this._fb.group(this.inpsesControlsModel, this.inpsesOptionsModel)
    ])
  });

  treasuriesTotal$: Observable<{ dueAmount: number, creditAmount: number }> = this.treasuries.valueChanges.pipe(
    startWith([]),
    map(treasuries => {
      if (!Array.isArray(treasuries) || !treasuries.length)
        return {dueAmount: 0, creditAmount: 0}

      const dueAmountTotal = treasuries.reduce((total, treasuryFormGroup) => {
        if (!isObject(treasuryFormGroup))
          return total

        if (!('dueAmount' in treasuryFormGroup) || null == treasuryFormGroup.dueAmount || '' == treasuryFormGroup.dueAmount)
          return total

        return total + parseFloat(treasuryFormGroup.dueAmount)
      }, 0)

      const creditAmountTotal = treasuries.reduce((total, treasuryFormGroup) => {
        if (!isObject(treasuryFormGroup))
          return total

        if (!('creditAmount' in treasuryFormGroup) || null == treasuryFormGroup.creditAmount || '' == treasuryFormGroup.creditAmount)
          return total

        return total + parseFloat(treasuryFormGroup.creditAmount)
      }, 0)

      return {dueAmount: dueAmountTotal, creditAmount: creditAmountTotal}
    })
  )

  inpsesTotal$: Observable<{ debt: number, credit: number }> = this.inpses.valueChanges.pipe(
    startWith([]),
    map(inpses => {
      if (!Array.isArray(inpses) || !inpses.length)
        return {debt: 0, credit: 0}

      const debtTotal = inpses.reduce((total, inpsFormGroup) => {
        if (!isObject(inpsFormGroup))
          return total

        if (!('debt' in inpsFormGroup) || null == inpsFormGroup.debt || '' == inpsFormGroup.debt)
          return total

        return total + parseFloat(inpsFormGroup.debt)
      }, 0)

      const creditTotal = inpses.reduce((total, inpsFormGroup) => {
        if (!isObject(inpsFormGroup))
          return total

        if (!('credit' in inpsFormGroup) || null == inpsFormGroup.credit || '' == inpsFormGroup.credit)
          return total

        return total + parseFloat(inpsFormGroup.credit)
      }, 0)

      return {debt: debtTotal, credit: creditTotal}
    })
  )

  totals$: Observable<number> = combineLatest([this.treasuriesTotal$, this.inpsesTotal$]).pipe(
    map(combinedValues => {
      const [treasuriesTotal, inpsesTotal] = combinedValues

      const creditTotals = treasuriesTotal.creditAmount + inpsesTotal.credit
      const debitTotals = treasuriesTotal.dueAmount + inpsesTotal.debt

      return creditTotals - debitTotals
    })
  )

  inpsMatcher = new InpsErrorStateMatcher();

  get taxpayer() {
    return this.taxesForm.get('taxpayer') as FormGroup
  }

  get treasuries() {
    return this.taxesForm.get('treasuries') as FormArray
  }

  get inpses() {
    return this.taxesForm.get('inpses') as FormArray
  }

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _taxService: TaxService
  ) {
  }

  ngOnInit(): void {
    // TODO: In this way I set the two form arrays while also clearing them.
    //  Isn't there a better way to do this??
    this.treasuries.clear()
    this.inpses.clear()
  }

  birthDateChangeHandler(event: MatDatepickerInputEvent<unknown, unknown | null>) {
    console.log(event)
  }

  genderHandler(event: MatSelectChange) {
    console.log(event)
  }

  newTreasury(): FormGroup {
    return this._fb.group(this.treasuriesControlsModel)
  }

  treasuryAddHandler(event: MouseEvent) {
    console.log(event)

    this.treasuries.push(this.newTreasury())
  }

  treasuryDeleteHandler(treasury: AbstractControl, i: number, event: MouseEvent) {
    console.log(treasury, i, event)

    this.treasuries.removeAt(i)
  }

  dateFromChangeHandler(inps: AbstractControl, i: number, event: MatDatepickerInputEvent<unknown, unknown | null>) {
    console.log(inps, i, event)
  }

  dateToChangeHandler(inps: AbstractControl, i: number, event: MatDatepickerInputEvent<unknown, unknown | null>) {
    console.log(inps, i, event)
  }

  newInps(): FormGroup {
    return this._fb.group(this.inpsesControlsModel, this.inpsesOptionsModel)
  }

  inpsAddHandler(event: MouseEvent) {
    this.inpses.push(this.newInps())
  }

  inpsDeleteHandler(inps: AbstractControl, i: number, event: MouseEvent) {
    this.inpses.removeAt(i)
  }

  submitHandler() {
    this._taxService.setTax(this.taxesForm.value).subscribe({
      next: v => {
        console.log(v)

        this._snackBar.open('Modulo FXX inviato', '✅', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });

        this.dispose();
      },
      error: v => {
        console.log(v)

        this._snackBar.open('Impossibile inviare il modulo FXX', '❌', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
      },
      complete: () => {
        console.log('Completed "_taxService.setTax()".')
      }
    })
  }

  dispose() {
    this.taxesForm.reset()
    this.treasuries.clear()
    this.inpses.clear()
  }

}

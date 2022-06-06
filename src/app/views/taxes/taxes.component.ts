import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'ae-taxes',
  template: `
    <form class="taxes-form" [formGroup]="taxesForm" (ngSubmit)="submitHandler()">
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
                placeholder="Tip"
                formControlName="birthProvince"
              >
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Comune di nascita</mat-label>
              <input
                matInput
                type="text"
                placeholder="Tip"
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

                <div>
                  <mat-form-field appearance="fill">
                    <mat-label>Importo a debito</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="dueAmount"
                    >
                  </mat-form-field>

                  <h3>Importo a debito: {{500 | currency: 'EUR'}}</h3>
                </div>

                <div>
                  <mat-form-field appearance="fill">
                    <mat-label>Importo a credito</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="creditAmount"
                    >
                  </mat-form-field>

                  <h3>Importo a credito: {{500 | currency: 'EUR'}}</h3>
                </div>

                <button (click)="treasuryDeleteHandler(treasury, i, $event)" mat-mini-fab color="warn"
                        aria-label="Delete icon">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <button (click)="treasuryAddHandler($event)" mat-mini-fab color="primary" aria-label="Add icon">
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
                  >
                  <mat-datepicker-toggle matSuffix [for]="dateToRef"></mat-datepicker-toggle>
                  <mat-datepicker #dateToRef></mat-datepicker>
                </mat-form-field>

                <div>
                  <mat-form-field appearance="fill">
                    <mat-label>Debito</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="debt"
                    >
                  </mat-form-field>

                  <h3>Totale a debito: {{500 | currency: 'EUR'}}</h3>
                </div>

                <div>
                  <mat-form-field appearance="fill">
                    <mat-label>Credito</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="credit"
                    >
                  </mat-form-field>

                  <h3>Totale a credito: {{500 | currency: 'EUR'}}</h3>
                </div>

                <button (click)="inpsDeleteHandler(inps, i, $event)" mat-mini-fab color="warn" aria-label="Delete icon">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <button (click)="inpsAddHandler($event)" mat-mini-fab color="primary" aria-label="Add icon">
              <mat-icon>add</mat-icon>
            </button>
          </div>

        </mat-card-content>

        <mat-card-actions align="end">
          <button class="mb" mat-raised-button [disabled]="!taxesForm.valid" color="primary">
            Invia
          </button>
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

  @ViewChild('birthDateRef', {read: MatDatepicker, static: true}) birthDateMat!: MatDatepicker<any>;

  @ViewChild('dateFromRef', {read: MatDatepicker, static: true}) dateFromMat!: MatDatepicker<any>;

  @ViewChild('dateToRef', {read: MatDatepicker, static: true}) dateToMat!: MatDatepicker<any>;

  taxesForm = this._fb.group({
    taxpayer: this._fb.group({
      codiceFiscale: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthProvince: ['', [Validators.required]],
      birthCity: ['', [Validators.required]],
    }),
    treasuries: this._fb.array([
      this._fb.group({
        taxCode: ['', [Validators.required]],
        referenceYear: ['', [Validators.required]],
        dueAmount: ['', [Validators.required]],
        creditAmount: ['', [Validators.required]]
      })
    ]),
    inpses: this._fb.array([
      this._fb.group({
        headquartersCode: ['', [Validators.required]],
        causal: ['', [Validators.required]],
        inpsCode: ['', [Validators.required]],
        dateFrom: ['', [Validators.required]],
        dateTo: ['', [Validators.required]],
        debt: ['', [Validators.required]],
        credit: ['', [Validators.required]]
      })
    ])
  });

  get taxpayer() {
    return this.taxesForm.get('taxpayer') as FormGroup
  }

  get codiceFiscale() {
    return this.taxesForm.get('taxpayer.codiceFiscale')
  }

  get surname() {
    return this.taxesForm.get('taxpayer.surname')
  }

  get name() {
    return this.taxesForm.get('taxpayer.name')
  }

  get birthDate() {
    return this.taxesForm.get('taxpayer.birthDate')
  }

  get gender() {
    return this.taxesForm.get('taxpayer.gender')
  }

  get birthProvince() {
    return this.taxesForm.get('taxpayer.birthProvince')
  }

  get birthCity() {
    return this.taxesForm.get('taxpayer.birthCity')
  }

  get treasuries() {
    return this.taxesForm.get('treasuries') as FormArray
  }

  // get taxCode() {
  //   return this.taxesForm.get('taxCode')
  // }
  //
  // get referenceYear() {
  //   return this.taxesForm.get('referenceYear')
  // }
  //
  // get dueAmount() {
  //   return this.taxesForm.get('dueAmount')
  // }
  //
  // get creditAmount() {
  //   return this.taxesForm.get('creditAmount')
  // }

  get inpses() {
    return this.taxesForm.get('inpses') as FormArray
  }

  // get headquartersCode() {
  //   return this.taxesForm.get('headquartersCode')
  // }
  //
  // get causal() {
  //   return this.taxesForm.get('causal')
  // }
  //
  // get inpsCode() {
  //   return this.taxesForm.get('inpsCode')
  // }
  //
  // get dateFrom() {
  //   return this.taxesForm.get('dateFrom')
  // }
  //
  // get dateTo() {
  //   return this.taxesForm.get('dateTo')
  // }
  //
  // get debt() {
  //   return this.taxesForm.get('debt')
  // }
  //
  // get credit() {
  //   return this.taxesForm.get('credit')
  // }

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  birthDateChangeHandler(event: MatDatepickerInputEvent<unknown, unknown | null>) {
    console.log(event)
  }

  genderHandler(event: MatSelectChange) {
    console.log(event)
  }

  newTreasury(): FormGroup {
    return this._fb.group({
      taxCode: ['', [Validators.required]],
      referenceYear: ['', [Validators.required]],
      dueAmount: ['', [Validators.required]],
      creditAmount: ['', [Validators.required]]
    })
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
    return this._fb.group({
      headquartersCode: ['', [Validators.required]],
      causal: ['', [Validators.required]],
      inpsCode: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      debt: ['', [Validators.required]],
      credit: ['', [Validators.required]]
    })
  }

  inpsAddHandler(event: MouseEvent) {
    console.log(event)

    this.inpses.push(this.newInps())
  }

  inpsDeleteHandler(inps: AbstractControl, i: number, event: MouseEvent) {
    console.log(inps, i, event)

    this.inpses.removeAt(i)
  }

  submitHandler() {
    console.log(this.taxesForm)
  }

}

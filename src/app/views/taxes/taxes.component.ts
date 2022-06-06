import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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

          <div class="container">
            <h2 class="title">Erario</h2>

            <button (click)="treasuryHandler($event)" mat-mini-fab color="primary" aria-label="Add icon">
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <div class="container">
            <h2 class="title">INPS</h2>

            <button (click)="inpsHandler($event)" mat-mini-fab color="primary" aria-label="Add icon">
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

  taxesForm = this._fb.group({
    codiceFiscale: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    name: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthProvince: ['', [Validators.required]],
    birthCity: ['', [Validators.required]],
  });

  get codiceFiscale() {
    return this.taxesForm.get('codiceFiscale')
  }

  get surname() {
    return this.taxesForm.get('surname')
  }

  get name() {
    return this.taxesForm.get('name')
  }

  get birthDate() {
    return this.taxesForm.get('birthDate')
  }

  get gender() {
    return this.taxesForm.get('gender')
  }

  get birthProvince() {
    return this.taxesForm.get('birthProvince')
  }

  get birthCity() {
    return this.taxesForm.get('birthProvince')
  }

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submitHandler() {
    console.log(this.taxesForm)
  }

  birthDateChangeHandler(event: MatDatepickerInputEvent<unknown, unknown | null>) {
    console.log(event)
  }

  genderHandler(event: MatSelectChange) {
    console.log(event)
  }

  treasuryHandler(event: MouseEvent) {
    console.log(event)
  }

  inpsHandler(event: MouseEvent) {
    console.log(event)
  }

}

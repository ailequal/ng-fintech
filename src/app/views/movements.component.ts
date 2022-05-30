import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-movements',
  template: `
    <div>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select>
          <mat-option [value]="'card-01'">Carta 1</mat-option>
          <mat-option [value]="'card-02'">Carta 2</mat-option>
          <mat-option [value]="'card-03'">Carta 3</mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{2000 | currency: 'EUR'}}</h2>

      <div>
        list of movements
      </div>

      <button>Carica altro</button>
    </div>
  `,
  styles: []
})
export class MovementsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

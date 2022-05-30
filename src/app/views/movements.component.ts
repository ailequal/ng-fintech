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
        <ae-movement
          [title]="'First movement'"
          [description]="'Bought a new house. Really nice and expensive. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget hendrerit lorem, a sagittis nunc. Sed ullamcorper ipsum metus, at vestibulum magna ullamcorper et. Ut hendrerit consequat congue. Quisque ut facilisis massa, id pulvinar dolor. Fusce finibus, libero sed imperdiet blandit, justo lectus malesuada purus, non aliquam urna massa at nisl. Morbi mauris diam, feugiat eget quam vel, volutpat convallis orci. Proin porta mi arcu, nec semper massa tincidunt id. Etiam iaculis pretium maximus.'"
          [amount]=400000
          [type]="'out'"
          [date]="'03/04/2028'"
        ></ae-movement>
      </div>

      <button class="load-more" mat-stroked-button>Carica altro</button>
    </div>
  `,
  styles: [`
    .load-more {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class MovementsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

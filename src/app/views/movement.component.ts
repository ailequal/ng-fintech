import {Component, Input, OnInit} from '@angular/core';
import {MovementType} from "../model/movement";

@Component({
  selector: 'ae-movement',
  template: `
    <mat-accordion>

      <mat-expansion-panel
        (opened)="panelOpenState = true"
        (closed)="panelOpenState = false"
      >
        <mat-expansion-panel-header>
          <mat-panel-title>
            <span class="date">[{{date}}]</span>
            <span
              class="type"
              [ngClass]="type === 'in'? 'type-in': 'type-out'"
            >
              {{amount | currency: 'EUR'}}
            </span>
            <span class="title">{{title}}</span>
          </mat-panel-title>
          <mat-panel-description>
            Currently I am {{panelOpenState ? 'open' : 'closed'}}
          </mat-panel-description>
        </mat-expansion-panel-header>

        <p>{{description}}</p>
      </mat-expansion-panel>

    </mat-accordion>
  `,
  styles: [`
    .mat-expansion-panel-header-title > span{
      margin-left: 10px;
      margin-right: 10px;
    }

    .mat-form-field + .mat-form-field {
      margin-left: 8px;
    }

    .title, .type {
      font-weight: 700;
    }

    .type-in {
      color: #198754
    }

    .type-out {
      color: #dc3545
    }

    .date {
      font-size: 13px;
      color: #adb5bd
    }
  `]
})
export class MovementComponent implements OnInit {

  @Input() title: string | null = null;

  @Input() description: string | null = null;

  @Input() amount: number | null = null;

  @Input() type: MovementType | null = null;

  @Input() date: string | null = null;

  panelOpenState = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}

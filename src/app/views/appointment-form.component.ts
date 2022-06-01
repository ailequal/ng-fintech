import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DayWithSlots, Location} from "../model/location";
import {MatDatepicker} from "@angular/material/datepicker";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ae-appointment-form',
  template: `
    <form [formGroup]="appointmentForm">
      <mat-card class="appointment-form">

        <mat-card-header>
          <mat-card-title class="title">Data e ora</mat-card-title>
        </mat-card-header>

        <mat-card-content>

          <mat-form-field appearance="fill">
            <mat-label>Scegli una data</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              [matDatepickerFilter]="appointmentFilter"
              formControlName="date"
            >
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-stroked-button (click)="onClose.emit($event)">Chiudi</button>
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .appointment-form {
      min-width: 120px;
    }

    .mat-card-title {
      font-weight: 400;
    }

    .mat-card-actions .mat-button,
    .mat-card-actions .mat-raised-button,
    .mat-card-actions .mat-stroked-button {
      margin: 0 0 0 0;
    }

    .mat-card-actions .mat-button.mb,
    .mat-card-actions .mat-raised-button.mb,
    .mat-card-actions .mat-stroked-button.mb {
      margin-bottom: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm = new FormGroup({
    date: new FormControl(''),
  });

  // TODO: Hard coded values for now.
  // ...

  @ViewChild('picker', {read: MatDatepicker, static: true}) picker!: MatDatepicker<any>;

  @Input() location: Location | null = null

  @Input() dayWithSlots: DayWithSlots[] = []

  @Output() onClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

  appointmentFilter = (d: Date | null): boolean => {
    // Only allow a date from day with slots.
    const day = (d || new Date());

    return this.dayWithSlots.some(element => {
      return (new Date(element.day)).getTime() === day.getTime()
    })
  };

  cleanUp() {
    this.appointmentForm.reset()
  }

}

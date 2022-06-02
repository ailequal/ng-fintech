import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../../../models/location";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormBuilder} from "@angular/forms";

// @link https://stackoverflow.com/questions/54915681/how-to-hide-material-input

@Component({
  selector: 'ae-appointment-form',
  template: `
    <ng-container *ngIf="location">
      <ae-leaflet
        [coords]="location.coords"
        [zoom]="9"
        [markerText]="location.name"
      ></ae-leaflet>

      <br>
    </ng-container>

    <mat-card class="appointment-form">

      <form [formGroup]="appointmentForm">

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
              required
              (dateChange)="dateChangeHandler($event)"
            >
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <br>

          <mat-form-field [class.cdk-visually-hidden]="!selectedDayWithSlots" class="full-width" appearance="fill">
            <mat-label>Orari disponibili</mat-label>
            <mat-select formControlName="time" required>
              <mat-option
                *ngFor="let timeSlot of selectedDayWithSlots?.slots"
                [value]="timeSlot"
              >
                {{timeSlot}}
              </mat-option>
            </mat-select>
          </mat-form-field>

        </mat-card-content>

      </form>

      <mat-card-actions align="end">
        <button mat-raised-button (click)="bookHandler()" [disabled]="!appointmentForm.valid" color="primary">
          Prenota
        </button>
        <button mat-stroked-button (click)="onClose.emit($event)">Chiudi</button>
      </mat-card-actions>

    </mat-card>
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
      margin: 0 10px 0 10px;
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

  @ViewChild('picker', {read: MatDatepicker, static: true}) picker!: MatDatepicker<any>;

  @Input() location: Location | null = null

  @Input() allDayWithSlots: DayWithSlots[] = []

  selectedDayWithSlots: DayWithSlots | null = null

  selectedDayWithSlot: DayWithSlot | null = null

  @Output() onBook: EventEmitter<DayWithSlot> = new EventEmitter<DayWithSlot>()

  @Output() onClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  appointmentForm = this._fb.group({
    date: [''],
    time: [{value: '', disabled: true}]
  });

  get date() {
    return this.appointmentForm.get('date')
  }

  get time() {
    return this.appointmentForm.get('time')
  }

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  appointmentFilter = (d: Date | null): boolean => {
    // Only allow a date from day with slots.
    const day = (d || new Date());

    return this.allDayWithSlots.some(element => {
      return (new Date(element.day)).getTime() === day.getTime()
    })
  };

  dateChangeHandler(event: MatDatepickerInputEvent<Date, Date | null>) {
    this.time?.reset()

    if (!event || !event.value) {
      this.selectedDayWithSlots = null
      return
    }

    const selectedDate = this.dateToString(event.value);
    const selectedDayWithSlots = this.allDayWithSlots.find(element => {
      return element.day === selectedDate
    })

    if (!selectedDayWithSlots) {
      this.selectedDayWithSlots = null
      return
    }

    this.selectedDayWithSlots = selectedDayWithSlots;
    this.time?.enable()
  }

  dateToString(d: Date): string {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [month, day, year].join('/');
  }

  bookHandler() {
    if (!this.selectedDayWithSlots || !this.time)
      throw new Error('Day and slot should be filled at this point.')

    const selectedDayWithSlot: DayWithSlot = {
      day: this.selectedDayWithSlots.day,
      slot: this.time.value
    }

    this.selectedDayWithSlot = selectedDayWithSlot
    this.onBook.emit(selectedDayWithSlot)
  }

  cleanUp() {
    this.selectedDayWithSlots = null
    this.selectedDayWithSlot = null
    this.time?.disable()
    this.appointmentForm.reset()
  }

}

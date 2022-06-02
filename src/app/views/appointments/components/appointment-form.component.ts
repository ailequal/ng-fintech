import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../../../models/location";
import {FormBuilder} from "@angular/forms";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {dateToString} from "../../../shared/utilities/date-to-string";

@Component({
  selector: 'ae-appointment-form',
  template: `
    <ng-container *ngIf="location">
      <ae-leaflet
        [coords]="location.coords"
        [zoom]="16"
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

          <mat-form-field [class.cdk-visually-hidden]="!availableSlots" class="full-width" appearance="fill">
            <mat-label>Orari disponibili</mat-label>
            <mat-select formControlName="time" required>
              <mat-option
                *ngFor="let timeSlot of availableSlots?.slots"
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

  @Input() allSlots: DayWithSlots[] | null = null

  availableSlots: DayWithSlots | null = null

  selectedSlot: DayWithSlot | null = null

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
    if (!this.allSlots)
      return false

    // Only allow a date from day with slots.
    const day = (d || new Date());

    return this.allSlots.some(element => {
      return (new Date(element.day)).getTime() === day.getTime()
    })
  };

  dateChangeHandler(event: MatDatepickerInputEvent<Date, Date | null>) {
    this.time?.reset()

    if (!event || !event.value || !this.allSlots) {
      this.availableSlots = null
      return
    }

    const selectedDate = dateToString(event.value);
    const availableSlots = this.allSlots.find(element => {
      return element.day === selectedDate
    })

    if (!availableSlots) {
      this.availableSlots = null
      return
    }

    this.availableSlots = availableSlots;
    this.time?.enable()
  }

  bookHandler() {
    if (!this.availableSlots || !this.time)
      throw new Error('Day and slot should be filled at this point.')

    const selectedSlot: DayWithSlot = {
      day: this.availableSlots.day,
      slot: this.time.value
    }

    this.selectedSlot = selectedSlot
    this.onBook.emit(selectedSlot)
  }

  cleanUp() {
    this.availableSlots = null
    this.selectedSlot = null
    this.time?.disable()
    this.appointmentForm.reset()
  }

}

import {AppointmentFormComponent} from "./components/appointment-form.component";
import {AppointmentService} from "../../api/appointment.service";
import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../../models/location";
import {MatDrawer} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Component({
  selector: 'ae-appointments',
  template: `
    <mat-drawer-container class="container" autosize>
      <ae-appointment-list
        class="sidenav-content"
        [locations]="locations$ | async"
        (onClick)="clickHandler($event)"
      >
      </ae-appointment-list>

      <mat-drawer (closed)="closedHandler($event)" #drawerRef class="sidenav" mode="side" position="end">
        <ae-appointment-form
          #appointmentFormRef
          [location]="selectedLocation"
          [allSlots]="slots$ | async"
          (onBook)="bookHandler($event)"
          (onClose)="closedHandler($event)"
        >
        </ae-appointment-form>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    .container {
      min-height: 530px;
      background-color: white;
    }

    .sidenav-content {
    }

    .sidenav {
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .container {
        min-height: 600px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsComponent implements OnInit {

  locations$: Observable<Location[]> = this._appointmentService.getLocations()

  selectedLocation: Location | null = null

  slots$: Observable<DayWithSlots[]> | null = null

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  @ViewChild('appointmentFormRef', {
    read: AppointmentFormComponent,
    static: true
  }) appointmentForm!: AppointmentFormComponent;

  constructor(
    private _snackBar: MatSnackBar,
    private _appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
  }

  clickHandler(location: Location) {
    // Set the active location.
    if (!location) {
      this.selectedLocation = null
      this.slots$ = null
      this.drawer.close().then(console.log)
      return
    }
    this.selectedLocation = location;

    // Set the relative slots.
    this.slots$ = this._appointmentService.getSlots(this.selectedLocation._id)

    this.drawer.toggle().then(console.log)
  }

  bookHandler(schedule: DayWithSlot) {
    this._appointmentService.setSchedule(schedule).subscribe({
      next: v => {
        console.log(v)

        this._snackBar.open('Appuntamento prenotato', '✅', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });

        this.dispose();
      },
      error: v => {
        console.log(v)

        this._snackBar.open('Impossibile prenotare l\'appuntamento', '❌', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
      },
      complete: () => {
        console.log('Completed "_appointmentService.setSchedule()".')
      }
    })
  }

  closedHandler(event: MouseEvent | void) {
    this.dispose()
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
    this.appointmentForm.cleanUp()
  }

}

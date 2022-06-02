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
        *ngIf="(locations$ | async) as locations"
        class="sidenav-content"
        [locations]="locations"
        (onClick)="clickHandler($event)"
      >
      </ae-appointment-list>

      <mat-drawer (closed)="closedHandler($event)" #drawerRef class="sidenav" mode="side" position="end">
        <ae-appointment-form
          #appointmentFormRef
          [location]="selectedLocation"
          [allDayWithSlots]="selectedDayWithSlots"
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
    }

    .sidenav-content {
    }

    .sidenav {
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .container {
        min-height: 460px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsComponent implements OnInit {

  locations$: Observable<Location[]> = this._appointmentService.getLocations()

  selectedLocation: Location | null = null

  selectedDayWithSlots: DayWithSlots[] = []

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
    // this._appointmentService.getLocations().subscribe(console.log)
    // this._appointmentService.getSlots(3).subscribe(console.log)
    // this._appointmentService.setSchedule({day: '6/21/2022', slot: 4}).subscribe(console.log)
  }

  clickHandler(location: Location) {
    if (!location) {
      this.selectedLocation = null
      this.selectedDayWithSlots = []
      return
    }

    // // Set the active location.
    // const selectedLocation = this.locations.find(element => {
    //   return element._id === location._id
    // })
    //
    // if (!selectedLocation) {
    //   this.selectedLocation = null;
    //   this.selectedDayWithSlots = []
    //   return;
    // }
    //
    // this.selectedLocation = selectedLocation
    //
    // // Set the active day with slots.
    // this._appointmentService.getSlots(this.selectedLocation._id).subscribe(v => {
    //   const selectedDayWithSlots = v
    //
    //   if (!selectedDayWithSlots) {
    //     this.selectedDayWithSlots = []
    //     return;
    //   }
    //
    //   this.selectedDayWithSlots = selectedDayWithSlots
    //   console.log(this.selectedDayWithSlots)
    //
    //   this.drawer.toggle().then(r => console.log(r))
    // })
  }

  bookHandler(dayWithSlot: DayWithSlot) {
    // TODO: Save the data on the server.
    console.log(dayWithSlot);

    this._snackBar.open('Appuntamento prenotato', '✅', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });

    this.dispose();
  }

  closedHandler(event: MouseEvent | void) {
    this.dispose()
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
    this.appointmentForm.cleanUp()
  }

}

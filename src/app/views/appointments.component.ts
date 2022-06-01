import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../model/location";
import {MatDrawer} from "@angular/material/sidenav";
import {AppointmentFormComponent} from "./appointment-form.component";

@Component({
  selector: 'ae-appointments',
  template: `
    <mat-drawer-container class="container" autosize>
      <ae-appointment-list
        class="sidenav-content"
        [locations]="locations"
        (onClick)="clickHandler($event)"
      >
      </ae-appointment-list>

      <mat-drawer #drawerRef class="sidenav" mode="side" position="end">
        <ae-appointment-form [location]="selectedLocation" #appointmentRef></ae-appointment-form>
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

  // TODO: Hard coded values for now.
  locations: Location[] = [
    {
      _id: 'fjds9j3h2l2',
      name: 'Sede Milano 01',
      address: 'Via Ciao 22, Milano',
      phone: '+39 055 483927',
      email: 'milan-01@bank.com',
      coords: [22, 33]
    },
    {
      _id: 'fjds9j3h2l3',
      name: 'Sede Milano 02',
      address: 'Via Wow 34, Milano',
      phone: '+39 055 483928',
      email: 'milan-02@bank.com',
      coords: [2243, 4333]
    },
    {
      _id: 'fjds9j3h2l3',
      name: 'Sede Milano 03',
      address: 'Via Cosimo 52, Milano',
      phone: '+39 055 483929',
      email: 'milan-03@bank.com',
      coords: [252, 343]
    }
  ]

  selectedLocation: Location | null = null

  dayWithSlot: DayWithSlot = {
    day: '01/01/2022',
    slot: 5
  }

  daysWithSlot: DayWithSlots = {
    day: '05/04/2022',
    slots: [5, 6, 8]
  }

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  @ViewChild('appointmentRef', {read: AppointmentFormComponent, static: true}) appointment!: AppointmentFormComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  clickHandler(location: Location) {
    this.selectedLocation = location
    this.drawer.toggle().then(r => console.log(r))
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
  }

}

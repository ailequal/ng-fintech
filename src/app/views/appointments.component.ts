import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {DayWithSlots, Location} from "../model/location";
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
        <ae-appointment-form
          #appointmentRef
          [location]="selectedLocation"
          [dayWithSlots]="selectedDayWithSlots"
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
      _id: 'fjds9j3h2l4',
      name: 'Sede Milano 03',
      address: 'Via Cosimo 52, Milano',
      phone: '+39 055 483929',
      email: 'milan-03@bank.com',
      coords: [252, 343]
    }
  ]

  selectedLocation: Location | null = null

  dayWithSlots: { id: string, dayWithSlots: DayWithSlots[] }[] = [
    {
      id: 'fjds9j3h2l2',
      dayWithSlots: [
        {
          day: '20/06/2022',
          slots: [9, 11, 12]
        },
        {
          day: '22/06/2022',
          slots: [11, 15]
        },
        {
          day: '23/06/2022',
          slots: [10]
        }
      ]
    },
    {
      id: 'fjds9j3h2l3',
      dayWithSlots: [
        {
          day: '21/06/2022',
          slots: [11]
        }
      ]
    },
    {
      id: 'fjds9j3h2l4',
      dayWithSlots: [
        {
          day: '24/06/2022',
          slots: [9, 11]
        }
      ]
    }
  ]

  selectedDayWithSlots: DayWithSlots[] = []

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  @ViewChild('appointmentRef', {read: AppointmentFormComponent, static: true}) appointment!: AppointmentFormComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  clickHandler(location: Location) {
    if (!location) {
      this.selectedLocation = null
      this.selectedDayWithSlots = []
      return
    }

    // Set the active location.
    const selectedLocation = this.locations.find(element => {
      return element._id === location._id
    })

    if (!selectedLocation) {
      this.selectedLocation = null;
      this.selectedDayWithSlots = []
      return;
    }

    this.selectedLocation = selectedLocation

    // Set the active day with slots.
    const selectedDayWithSlots = this.dayWithSlots.find(element => {
      return element.id === this.selectedLocation?._id
    })

    if (!selectedDayWithSlots) {
      this.selectedDayWithSlots = []
      return;
    }

    this.selectedDayWithSlots = selectedDayWithSlots.dayWithSlots

    this.drawer.toggle().then(r => console.log(r))
  }

  dispose() {
    this.drawer.close().then(r => console.log(r))
  }

}

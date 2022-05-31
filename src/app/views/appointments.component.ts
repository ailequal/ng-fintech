import {Component, OnInit} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../model/location";

@Component({
  selector: 'ae-appointments',
  template: `
    <p>
      appointments works!
    </p>
  `,
  styles: []
})
export class AppointmentsComponent implements OnInit {

  // TODO: Hard coded values for now.
  locations: Location[] = [
    {
      _id: 'fjds9j3h2l2',
      name: 'Sede Milano 01',
      address: 'Via Ciao 22',
      phone: '+39 055 483927',
      email: 'milan-01@bank.com',
      coords: [22, 33]
    },
    {
      _id: 'fjds9j3h2l3',
      name: 'Sede Milano 02',
      address: 'Via Wow 34',
      phone: '+39 055 483928',
      email: 'milan-02@bank.com',
      coords: [2243, 4333]
    },
    {
      _id: 'fjds9j3h2l3',
      name: 'Sede Milano 03',
      address: 'Via Cosimo 52',
      phone: '+39 055 483929',
      email: 'milan-03@bank.com',
      coords: [252, 343]
    }
  ]

  dayWithSlot: DayWithSlot = {
    day: '01/01/2022',
    slot: 5
  }

  daysWithSlot: DayWithSlots = {
    day: '05/04/2022',
    slots: [5, 6, 8]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DayWithSlot, DayWithSlots, Location} from "../model/location";

@Component({
  selector: 'ae-appointments',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title class="title">Sedi</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <mat-list class="locations" role="list">
          <mat-list-item *ngFor="let location of locations;" role="listitem" (click)="onClick(location, $event)">
            <div class="location">

              <div class="info">
                <div class="left">
                  <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Business icon">business
                  </mat-icon>
                </div>

                <div class="right">
                  <div class="top">
                    <span class="location-name">{{location.name}}</span>
                  </div>
                  <div class="bottom">
                    <span class="location-address">{{location.address}}</span>
                  </div>
                </div>
              </div>

            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>

      <mat-card-actions>
        <button class="full-width" mat-button>I DO NOT NEED THIS BUTTON</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .locations > .mat-list-item {
      height: 105px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    .locations > .mat-list-item:hover {
      background-color: #e9ecef;
    }

    .locations .location {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .locations .location > .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 30px;
      max-width: 400px;
      width: 100%;
    }

    .locations .location > .info > .left {
    }

    .locations .location > .info > .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
    }

    .locations .location > .info > .right > .top .location-name {
      font-weight: 700;
    }

    .full-width {
      width: 100%;
    }

    /* Small size */
    @media screen and (min-width: 576px) {
      .locations > .mat-list-item {
        height: 48px;
      }

      .locations .location {
        flex-direction: row;
        align-items: center;
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

  onClick(location: Location, event: MouseEvent) {
    console.log(location)
    console.log(event)
  }
}

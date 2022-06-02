import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "../../../models/location";

@Component({
  selector: 'ae-appointment-list',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title class="title">Sedi</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <mat-list class="locations" role="list">
          <mat-list-item *ngFor="let location of locations;" role="listitem" (click)="onClick.emit(location)">
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
export class AppointmentListComponent implements OnInit {

  @Input() locations: Location[] = []

  @Output() onClick: EventEmitter<Location> = new EventEmitter<Location>()

  constructor() {
  }

  ngOnInit(): void {
  }

}

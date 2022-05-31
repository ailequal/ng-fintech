import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Location} from "../model/location";

@Component({
  selector: 'ae-appointment',
  template: `
    <div>
      <p>
        appointment works!
      </p>

      <button (click)="debugHandler($event)">debug</button>
    </div>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent implements OnInit {

  @Input() location: Location | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

  debugHandler(event: MouseEvent) {
    console.log(event)
    console.log(this.location)
  }

}

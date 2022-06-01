import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-leaflet',
  template: `
    <p>
      leaflet works!
    </p>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

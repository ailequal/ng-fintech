import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-taxes',
  template: `
    <h2>taxes</h2>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

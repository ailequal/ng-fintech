import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-dashboard-toolbar',
  template: `
    <mat-toolbar color="primary">
      <span>NgFintech</span>
    </mat-toolbar>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

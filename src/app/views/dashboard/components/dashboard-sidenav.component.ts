import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-dashboard-sidenav',
  template: `
    <mat-drawer-container class="example-container">

      <mat-drawer mode="side" opened>
        <ng-content select="[sideDrawer]"></ng-content>
      </mat-drawer>

      <mat-drawer-content>
        <ng-content select="[sideContent]"></ng-content>
      </mat-drawer-content>

    </mat-drawer-container>
  `,
  styles: [`
    .mat-drawer {
      width: 240px;
      min-height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidenavComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

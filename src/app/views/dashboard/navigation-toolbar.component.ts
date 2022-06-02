import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-navigation-toolbar',
  template: `
    <mat-toolbar color="primary">
      <span>NgFintech</span>
    </mat-toolbar>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

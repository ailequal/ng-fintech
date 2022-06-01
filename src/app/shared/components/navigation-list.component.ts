import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationLink} from "../../model/link";

@Component({
  selector: 'ae-navigation-list',
  template: `
    <mat-selection-list #shoes [multiple]="false">

      <mat-list-option class="menu" value="menu">
        Menu
      </mat-list-option>

      <mat-list-option
        [value]="link.value"
        *ngFor="let link of links"
        [routerLink]="link.routerLink"
        routerLinkActive="selected"
      >
        <mat-icon mat-list-icon>{{link.icon}}</mat-icon>
        {{link.title}}
      </mat-list-option>

      <mat-list-option
        class="user"
        value="user"
        (click)="onLogout.emit($event)"
      >
        <mat-icon mat-list-icon>person</mat-icon>
        <div mat-line>Name Surname</div>
        <div mat-line>Logout</div>
      </mat-list-option>

    </mat-selection-list>
  `,
  styles: [`
    .mat-selection-list {
      padding-top: 0;
    }

    .mat-list-base .mat-list-option {
      height: 64px;
    }

    .mat-list-base .mat-list-option.menu {
      background-color: #e9ecef;
      font-size: 20px;
      font-weight: 700;
    }

    .mat-list-base .mat-list-option.user {
      height: 80px;
    }

    .selected {
      background-color: rgba(0, 0, 0, 0.12);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationListComponent implements OnInit {

  @Input() links: NavigationLink[] = []

  @Output() onLogout: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

}

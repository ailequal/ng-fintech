import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationLink} from "../../models/link";

@Component({
  selector: 'ae-dashboard',
  template: `
    <div>
      <ae-dashboard-sidenav>
        <ae-dashboard-list
          (onLogout)="handleLogout($event)"
          [links]="links"
          class="side-drawer"
          sideDrawer
        >
        </ae-dashboard-list>

        <div class="side-content" sideContent>
          <ae-dashboard-toolbar></ae-dashboard-toolbar>
        </div>
      </ae-dashboard-sidenav>
    </div>
  `,
  styles: [`
    .side-drawer {
    }

    .side-content {
      min-height: 100vh;
      background-color: #e9ecef;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  links: NavigationLink[] = [
    {
      title: 'Home',
      value: 'home',
      icon: 'home',
      routerLink: '/'
    },
    {
      title: 'Carte',
      value: 'cards',
      icon: 'credit_card',
      routerLink: '/cards'
    },
    {
      title: 'Movimenti',
      value: 'movements',
      icon: 'receipt_long',
      routerLink: '/movements'
    },
    {
      title: 'Trasferisci',
      value: 'transfer',
      icon: 'paid',
      routerLink: '/transfer'
    },
    {
      title: 'Appuntamenti',
      value: 'appointments',
      icon: 'event',
      routerLink: '/appointments'
    },
    {
      title: 'Tasse',
      value: 'taxes',
      icon: 'summarize',
      routerLink: '/taxes'
    },
    {
      title: 'Debug',
      value: 'debug',
      icon: 'bug_report',
      routerLink: '/debug'
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  handleLogout(event: MouseEvent) {
    console.log(event)
  }

}
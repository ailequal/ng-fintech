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

          <div class="inner-content">
            <router-outlet></router-outlet>
          </div>
        </div>
      </ae-dashboard-sidenav>
    </div>
  `,
  styles: [`
    .side-drawer {
    }

    .side-content {
      min-height: 100vh;
      background-color: white;
    }

    .inner-content {
      margin: 50px 50px 0 50px;
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
      routerLink: '/dashboard'
    },
    {
      title: 'Carte',
      value: 'cards',
      icon: 'credit_card',
      routerLink: '/dashboard/cards'
    },
    {
      title: 'Movimenti',
      value: 'movements',
      icon: 'receipt_long',
      routerLink: '/dashboard/movements'
    },
    {
      title: 'Trasferisci',
      value: 'transfer',
      icon: 'paid',
      routerLink: '/dashboard/transfer'
    },
    {
      title: 'Appuntamenti',
      value: 'appointments',
      icon: 'event',
      routerLink: '/dashboard/appointments'
    },
    {
      title: 'Tasse',
      value: 'taxes',
      icon: 'summarize',
      routerLink: '/dashboard/taxes'
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

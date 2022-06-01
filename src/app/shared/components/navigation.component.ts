import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationLink} from "../../model/link";

@Component({
  selector: 'ae-navigation',
  template: `
    <div>
      <ae-navigation-sidenav>
        <ae-navigation-list
          (onLogout)="handleLogout($event)"
          [links]="links"
          class="side-drawer"
          sideDrawer
        >
        </ae-navigation-list>

        <div class="side-content" sideContent>
          <ae-navigation-toolbar></ae-navigation-toolbar>
        </div>
      </ae-navigation-sidenav>
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
export class NavigationComponent implements OnInit {

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

import {Component} from '@angular/core';

@Component({
  selector: 'ae-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ng-fintech';
}

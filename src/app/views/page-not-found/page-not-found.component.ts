import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-page-not-found',
  template: `
    <div>
      <h1>404: Page not found!!</h1>

      <br><br>

      <a routerLink="/">Home</a>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-login',
  template: `
    <div class="login">

      <router-outlet></router-outlet>

    </div>
  `,
  styles: [`
    div.login {
      max-width: 576px;
      margin: 60px auto 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

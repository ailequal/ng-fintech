import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-welcome',
  template: `
    <div class="welcome">
      <h2 class="title">Benvenuto</h2>

      <h3 class="subtitle">Usa il pannello a lato per navigare all'interno dell'applicazione.</h3>
    </div>
  `,
  styles: [`
    .welcome {
      padding: 50px 30px;
    }

    .welcome .title {
      margin-bottom: 30px;
      font-size: 40px;
      text-align: center;
    }

    .welcome .subtitle {
      font-size: 30px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

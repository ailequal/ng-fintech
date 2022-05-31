import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>
        <mat-form-field class="full-width" appearance="fill">
          <mat-label>Cerca</mat-label>
          <input matInput type="search">
        </mat-form-field>

        <div class="contacts-list">
          <h3 class="title">Contatti</h3>

          <ul>
            <li class="contact-item">
              <div>
                User
              </div>
            </li>
          </ul>
        </div>

        <mat-card-actions>
          <button mat-button>LIKE</button>
          <button mat-button>SHARE</button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>


    <div class="contacts">


    </div>
  `,
  styles: [`
    .contacts {
      max-width: 576px;
    }

    .contacts-list {
      padding: 10px 20px;
    }

    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .full-width {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

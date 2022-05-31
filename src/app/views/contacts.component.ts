import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ae-contact-list></ae-contact-list>

        <mat-card-actions>
          <button class="full-width" mat-raised-button color="primary">Nuovo contatto</button>
        </mat-card-actions>

      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .contacts {
      max-width: 768px;
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

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Contact} from "../model/contact";

@Component({
  selector: 'ae-contacts',
  template: `
    <mat-card class="contacts">
      <mat-card-content>

        <ae-contact-list [contacts]="contacts"></ae-contact-list>

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

  // TODO: Hard coded values for now.
  contacts: Contact[] = [
    {
      _id: '4jug89hsgvh73',
      name: 'Mario',
      surname: 'Mario',
      iban: 'IT02L1234512345123456789013'
    },
    {
      _id: '4jug89hsgvh74',
      name: 'Luigi',
      surname: 'Mario',
      iban: 'IT02L1234512345123456789014'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

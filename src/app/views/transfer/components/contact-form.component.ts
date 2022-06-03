import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Contact, ContactForm} from "../../../models/contact";

@Component({
  selector: 'ae-contact-form',
  template: `
    <form [formGroup]="contactForm">
      <mat-card class="contact-form">

        <mat-card-header>
          <mat-card-title class="title">
            {{initialContact ? 'Modifica contatto' : 'Nuovo contatto'}}
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nome</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Lucas"
              formControlName="name"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Tip"
              formControlName="surname"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>IBAN</mat-label>
            <input
              matInput
              type="text"
              required
              minlength="27"
              maxlength="27"
              placeholder="IT02L1234512345123456789012"
              formControlName="iban"
            >
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            (click)="submitHandler()"
            [disabled]="!contactForm.valid"
            type="button"
            class="full-width mb"
            color="primary"
          >
            Salva
          </button>
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.54);
    }

    .full-width {
      width: 100%;
    }

    .mat-card-title {
      font-weight: 400;
    }

    .mat-card-actions .mat-button,
    .mat-card-actions .mat-raised-button,
    .mat-card-actions .mat-stroked-button {
      margin: 0 0 0 0;
    }

    .mat-card-actions .mat-button.mb,
    .mat-card-actions .mat-raised-button.mb,
    .mat-card-actions .mat-stroked-button.mb {
      margin-bottom: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {

  contactForm = this._fb.group({
    name: [''],
    surname: [''],
    iban: ['']
  });

  @Input() initialContact: Contact | null = null

  @Output() onSubmit: EventEmitter<ContactForm> = new EventEmitter<ContactForm>();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    // Update the form value for the edit scenario, if available.
    this.contactForm.patchValue({
      name: this.initialContact?.name,
      surname: this.initialContact?.surname,
      iban: this.initialContact?.iban
    })
  }

  submitHandler() {
    this.onSubmit.emit(this.contactForm.value)
  }

  cleanUp() {
    this.contactForm.reset()
  }

}

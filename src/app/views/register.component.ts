import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'ae-register',
  template: `
    <form #f="ngForm" (ngSubmit)="submitHandler(f)">
      <mat-card class="register">

        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Email</mat-label>
            <input
              ngModel
              #nameRef="ngModel"
              name="email"
              matInput
              type="email"
              required
              email
              placeholder="lucastip@earth.org"
            >
            <mat-error *ngIf="nameRef.errors?.['email']">
              Inserire un indirizzo email valido.
            </mat-error>
            <mat-error *ngIf="nameRef.errors?.['required']">
              Il campo email è <strong>obbligatorio</strong>.
            </mat-error>
          </mat-form-field>

          <!--debut input status-->
          <pre>
            {{nameRef.errors | json}}
          </pre>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nome</mat-label>
            <input
              ngModel
              name="name"
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Lucas"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              ngModel
              name="surname"
              matInput
              type="text"
              required
              minlength="3"
              maxlength="24"
              placeholder="Tip"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Password</mat-label>
            <input
              ngModel
              name="passwordAlpha"
              matInput
              [type]="hidePasswordAlpha ? 'password': 'text'"
              required
              minlength="8"
              maxlength="64"
            >
            <mat-icon matSuffix
                      (click)="hidePasswordAlpha = !hidePasswordAlpha">{{hidePasswordAlpha ? 'visibility_off' : 'visibility'}}</mat-icon>
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Ripeti la password</mat-label>
            <input
              ngModel
              name="passwordBeta"
              matInput
              [type]="hidePasswordBeta ? 'password': 'text'"
              required
              minlength="8"
              maxlength="64"
            >
            <mat-icon matSuffix
                      (click)="hidePasswordBeta = !hidePasswordBeta">{{hidePasswordBeta ? 'visibility_off' : 'visibility'}}</mat-icon>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            type="submit"
            [disabled]="!f.valid"
            class="full-width mb"
            color="primary"
          >
            Registrati
          </button>

          <button
            mat-raised-button
            (click)="onSignIn.emit()"
            type="button"
            class="full-width"
          >
            Hai già un account? Accedi
          </button>
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .register {
      min-width: 120px;
    }

    .full-width {
      width: 100%;
    }

    .mat-card-header {
      justify-content: center;
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
export class RegisterComponent implements OnInit {

  // TODO: The two passwords inputs must check that they hold the same value before sending the request.
  //  We will use a custom validator for this requirement.
  // TODO: Implement a more robust password validation (use special characters...).

  hidePasswordAlpha: boolean = true;

  hidePasswordBeta: boolean = true;

  @Output() onSignIn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submitHandler(f: NgForm) {
    if (f.value.passwordAlpha !== f.value.passwordBeta)
      throw new Error('The two passwords do not match!!')

    console.log(f.value)
  }

}

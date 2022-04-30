import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

/**
 * Useful resources.
 *
 * @link https://material.angular.io/components/input/examples
 * @link https://fireflysemantics.medium.com/angular-material-password-field-with-visibilitytoggle-d5342f97afbe
 */
@Component({
  selector: 'ae-register',
  template: `
    <form #f="ngForm" (ngSubmit)="submitHandler(f)" class="register-form">
      <mat-form-field class="full-width" appearance="fill">
        <mat-label>Email</mat-label>
        <input
          ngModel
          name="email"
          matInput
          type="email"
          required
          email
          placeholder="lucastip@earth.org"
        >
      </mat-form-field>

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
          [type]="hideAlpha ? 'password': 'text'"
          required
          minlength="8"
          maxlength="64"
        >
        <mat-icon matSuffix (click)="hideAlpha = !hideAlpha">{{hideAlpha ? 'visibility_off' : 'visibility'}}</mat-icon>
      </mat-form-field>

      <mat-form-field class="full-width" appearance="fill">
        <mat-label>Ripeti la password</mat-label>
        <input
          ngModel
          name="passwordBeta"
          matInput
          [type]="hideBeta ? 'password': 'text'"
          required
          minlength="8"
          maxlength="64"
        >
        <mat-icon matSuffix (click)="hideBeta = !hideBeta">{{hideBeta ? 'visibility_off' : 'visibility'}}</mat-icon>
      </mat-form-field>

      <button
        mat-raised-button
        type="submit"
        [disabled]="f.invalid"
        class="full-width mb"
        color="primary"
      >
        Registrati
      </button>

      <button
        mat-raised-button
        type="button"
        class="full-width"
      >
        Hai già un account? Accedi
      </button>
    </form>
  `,
  styles: [`
    .register-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }

    .mb {
      margin-bottom: 20px;
    }
  `]
})
export class RegisterComponent implements OnInit {

  // TODO: The two passwords inputs must check that they hold the same value before sending the request.
  // TODO: Implement a more robust password validation (use special characters...).

  hideAlpha: boolean = true;

  hideBeta: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Handles the form submission.
   *
   * @param f
   */
  submitHandler(f: NgForm) {
    console.log(f.value)
  }

}

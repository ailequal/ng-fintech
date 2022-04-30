import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

/**
 * Based from Angular Material 13.3.5 and component "Input".
 * See "Basic Inputs" from the relative examples (check the docs).
 *
 * @link https://material.angular.io/components/input/examples
 * @link https://fireflysemantics.medium.com/angular-material-password-field-with-visibilitytoggle-d5342f97afbe
 */
@Component({
  selector: 'ae-sign-in',
  template: `
    <form #f="ngForm" (ngSubmit)="submitHandler(f)" class="sign-in-form">
      <mat-form-field class="full-width" appearance="fill">
        <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Person icon">person</mat-icon>
        <mat-label>Email</mat-label>
        <input
          ngModel
          name="email"
          matInput
          type="email"
          required
          email
          placeholder="lucas@earth.org"
        >
      </mat-form-field>

      <mat-form-field class="full-width" appearance="fill">
        <mat-icon matPrefix color="primary" aria-hidden="false" aria-label="Lock icon">lock</mat-icon>
        <mat-label>Password</mat-label>
        <input
          ngModel
          name="password"
          matInput
          [type]="hide ? 'password': 'text'"
          required
          minlength="8"
          maxlength="64"
        >
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
      </mat-form-field>

      <button
        mat-raised-button
        type="submit"
        [disabled]="f.invalid"
        class="full-width mb"
        color="primary"
      >
        Accedi
      </button>

      <button
        mat-raised-button
        type="button"
        class="full-width"
      >
        Crea un nuovo account
      </button>
    </form>
  `,
  styles: [`
    .sign-in-form {
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
export class SignInComponent implements OnInit {

  hide: boolean = true;

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

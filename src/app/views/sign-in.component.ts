import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

/**
 * Useful resources.
 *
 * @link https://material.angular.io/components/input/examples
 * @link https://fireflysemantics.medium.com/angular-material-password-field-with-visibilitytoggle-d5342f97afbe
 */
@Component({
  selector: 'ae-sign-in',
  template: `
    <form #f="ngForm" (ngSubmit)="submitHandler(f)">
      <mat-card class="sign-in">

        <mat-card-header>
          <mat-card-title>Sign In</mat-card-title>
        </mat-card-header>

        <mat-card-content>
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
              placeholder="lucastip@earth.org"
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
        </mat-card-content>

        <mat-card-actions>
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
        </mat-card-actions>

      </mat-card>
    </form>
  `,
  styles: [`
    .sign-in {
      min-width: 120px;
      margin: 20px auto;
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

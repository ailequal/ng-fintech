import {Component, OnInit} from '@angular/core';

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
    <form class="sign-in-form">
      <mat-form-field class="full-width" appearance="fill">
        <mat-icon color="primary" matPrefix aria-hidden="false" aria-label="Person icon">person</mat-icon>
        <mat-label>Email</mat-label>
        <input type="email" matInput placeholder="lucas@earth.org" required>
      </mat-form-field>

      <mat-form-field class="full-width" appearance="fill">
        <mat-icon color="primary" matPrefix aria-hidden="false" aria-label="Lock icon">lock</mat-icon>
        <mat-label>Password</mat-label>
        <input [type]="hide ? 'password': 'text'" matInput required>
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
      </mat-form-field>

      <button mat-raised-button class="full-width mb" color="primary">Accedi</button>
      <button mat-raised-button class="full-width">Crea un nuovo account</button>
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

}

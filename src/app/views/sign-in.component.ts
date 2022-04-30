import {Component, OnInit} from '@angular/core';

/**
 * Based from Angular Material 13.3.5 and component "Input".
 * See "Basic Inputs" from the relative examples (check the docs).
 *
 * @link https://material.angular.io/components/input/examples
 */
@Component({
  selector: 'ae-sign-in',
  template: `
    <form class="sign-in-form">
      <mat-form-field class="full-width" appearance="fill">
        <mat-label>Email</mat-label>
        <input type="email" matInput placeholder="lucas@earth.org" required>
      </mat-form-field>

      <mat-form-field class="full-width" appearance="fill">
        <mat-label>Password</mat-label>
        <input type="password" matInput required>
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

  constructor() {
  }

  ngOnInit(): void {
  }

}

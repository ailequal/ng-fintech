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
    <form class="example-form">
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Favorite food</mat-label>
        <input matInput placeholder="Ex. Pizza" value="Sushi">
      </mat-form-field>

      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Leave a comment</mat-label>
        <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
      </mat-form-field>
    </form>
  `,
  styles: [`
    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }
  `]
})
export class SignInComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

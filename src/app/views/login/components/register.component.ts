import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {equalFieldsValidatorReactive} from "../../../shared/validators/equal-fields.validator";
import {RegisterErrorStateMatcher} from "../utilities/register-error-state-matcher";

@Component({
  selector: 'ae-register',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="submitHandler()">
      <mat-card class="register">

        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Email</mat-label>
            <input
              formControlName="email"
              matInput
              type="email"
              placeholder="lucastip@earth.org"
            >
            <mat-error *ngIf="email?.errors?.['email']">
              Inserire un indirizzo email valido.
            </mat-error>
            <mat-error *ngIf="email?.errors?.['required']">
              Il campo email è <strong>obbligatorio</strong>.
            </mat-error>
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Nome</mat-label>
            <input
              formControlName="name"
              matInput
              type="text"
              placeholder="Lucas"
            >
          </mat-form-field>

          <mat-form-field class="full-width" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input
              formControlName="surname"
              matInput
              type="text"
              placeholder="Tip"
            >
          </mat-form-field>

          <div formGroupName="passwords" class="passwords"
               [ngClass]="{error: passwords?.errors?.['equalFields'] && passwordBeta?.touched}">
            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Password</mat-label>
              <input
                formControlName="passwordAlpha"
                matInput
                [type]="hidePasswordAlpha ? 'password': 'text'"
                [errorStateMatcher]="registerMatcher"
              >
              <mat-icon matSuffix
                        (click)="hidePasswordAlpha = !hidePasswordAlpha">{{hidePasswordAlpha ? 'visibility_off' : 'visibility'}}</mat-icon>
            </mat-form-field>

            <mat-form-field class="full-width" appearance="fill">
              <mat-label>Ripeti la password</mat-label>
              <input
                formControlName="passwordBeta"
                matInput
                [type]="hidePasswordBeta ? 'password': 'text'"
                [errorStateMatcher]="registerMatcher"
              >
              <mat-icon matSuffix
                        (click)="hidePasswordBeta = !hidePasswordBeta">{{hidePasswordBeta ? 'visibility_off' : 'visibility'}}</mat-icon>
              <mat-error *ngIf="passwords?.errors?.['equalFields'] && passwordBeta?.touched">
                Le password inserite <strong>non</strong> coincidono.
              </mat-error>
            </mat-form-field>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            type="submit"
            [disabled]="!registerForm.valid"
            class="full-width mb"
            color="primary"
          >
            Registrati
          </button>

          <button
            mat-raised-button
            type="button"
            class="full-width"
            routerLink="/login/signin"
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

    .passwords.error {
      //  TODO: How can I get the colors variable from Angular Material??
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

  // TODO: Implement a more robust password validation (use special characters...).

  hidePasswordAlpha: boolean = true;

  hidePasswordBeta: boolean = true;

  registerForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    passwords: this._fb.group({
      passwordAlpha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      passwordBeta: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)
      ]],
    }, {validators: [equalFieldsValidatorReactive(['passwordAlpha', 'passwordBeta'])]})
  })

  registerMatcher = new RegisterErrorStateMatcher();

  get email() {
    return this.registerForm.get('email')
  }

  get name() {
    return this.registerForm.get('name')
  }

  get surname() {
    return this.registerForm.get('surname')
  }

  get passwords() {
    return this.registerForm.get('passwords')
  }

  get passwordAlpha() {
    return this.registerForm.get('passwords.passwordAlpha')
  }

  get passwordBeta() {
    return this.registerForm.get('passwords.passwordBeta')
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submitHandler() {
    console.log(this.registerForm.value)

    this._router.navigateByUrl('/login/signin').then(console.log)
  }

}

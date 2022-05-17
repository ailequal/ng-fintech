import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-login',
  template: `
    <ae-sign-in
      *ngIf="showSignIn"
      (onRegister)="registerHandler()"
    >

    </ae-sign-in>
    <br><br>
    <ae-register
      *ngIf="showRegister"
      (onSignIn)="signInHandler()"
    >
    </ae-register>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  showSignIn: boolean = true;

  showRegister: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  signInHandler(): void {
    this.showSignIn = true;
    this.showRegister = false;
    console.log('signInHandler')
  }

  registerHandler(): void {
    this.showSignIn = false;
    this.showRegister = true;
    console.log('registerHandler')
  }

}

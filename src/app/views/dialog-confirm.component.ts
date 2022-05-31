import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-dialog-confirm',
  template: `
    <h2 mat-dialog-title>Conferma azione</h2>

    <mat-dialog-content class="mat-typography">
      <h3>Sei sicuro di volere continuare?</h3>
      <p>Questa operazione e' irreversibile.</p>
    </mat-dialog-content>

    <mat-dialog-actions align="center">
      <button mat-raised-button [mat-dialog-close]="false" color="warn">Annulla</button>
      <button mat-raised-button [mat-dialog-close]="true" cdkFocusInitial color="primary">Conferma</button>
    </mat-dialog-actions>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogConfirmComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

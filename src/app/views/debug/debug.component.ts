import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ae-debug',
  template: `
    <div style="max-width: 992px; width: 80%; margin: 20px auto; border: 3px solid red; padding: 20px;">
      <h2>debugging...</h2>

      <!--call your component here-->
    </div>
  `,
  styles: []
})
export class DebugComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
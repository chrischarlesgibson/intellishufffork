import { Component } from '@angular/core';

@Component({
  selector: 'no-data',
  template: `
    <div class="container">
    <div class="no-data-component">
        <div class="icon-container">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <p class="message">No data available</p>
    </div>
  </div>
  `,
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

}

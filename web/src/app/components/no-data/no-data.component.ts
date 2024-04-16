import { Component } from '@angular/core';

@Component({
  selector: 'no-data',
  template: `
    <div class="no-data-component">
        <div class="icon-container">
          <!-- <i class="fas fa-exclamation-circle"></i> -->
          <img src="assets/images/s-no-orders.png" alt="">
        </div>
        <p class="message">No data available</p>
    </div>
  `,
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

}

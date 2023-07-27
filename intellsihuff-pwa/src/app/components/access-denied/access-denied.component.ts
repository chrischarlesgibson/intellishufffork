import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'access-denied',
  template: `
    <div class="container">
      <h1 class="big-403">403</h1>
      <h2>Access Forbidden</h2>
      <p>You do not have permission to access this page.</p>
      <a (click)="onGoToClicked()">Go to the front page →</a>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
      }

      .big-403 {
        font-size: 5rem;
        font-weight: bold;
        color: #f44336; /* You can change the color to your preference */
      }

      a {
        display: block;
        margin-top: 10px;
      }
    `,
  ],
})
export class AccessDeniedComponent {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('403 Forbidden');
  }

  onGoToClicked() {
    this.router.navigate(['/home']);
  }
}

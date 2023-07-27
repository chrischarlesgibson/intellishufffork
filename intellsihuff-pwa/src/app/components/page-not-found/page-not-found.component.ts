import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <h1 class="not-found-404">404</h1>
      <h2>Page Not Found</h2>
      <p>The requested page does not exist.</p>
      <a (click)="onGoToClicked()">Go to the front page →</a>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        text-align: center;
        border: none !important;
      }

      .not-found-404 {
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
export class PageNotFoundComponent {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Page Not Found');
  }
  onGoToClicked() {
    this.router.navigate(['/home']);
  }
}

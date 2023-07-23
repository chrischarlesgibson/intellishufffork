import { Component, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/universal/base.page';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent extends BasePage implements OnInit {
  isChildComponentActivated: boolean = false;
  isSidebarOpen = false;

  constructor() {
    super();
  }

  ngOnInit(): void {}
  openSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogoClicked() {
    this.router.navigate(['/admin']);
    this.isChildComponentActivated = true;
  }

  onChildComponentActivate(event: any): void {
    this.isChildComponentActivated = true;
  }
}

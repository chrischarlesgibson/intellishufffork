import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConstant } from 'src/app/universal/app-constant';
import { BasePage } from 'src/app/universal/base.page';

@Component({
  selector: 'admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})

export class AdminHomeComponent extends BasePage implements OnInit {
  isChildComponentActivated: boolean = false;
  isSidebarOpen = false;

  constructor(
    private titleService: Title
  ) {
    super();
    this.titleService.setTitle(`Admin | ${AppConstant.SITE_NAME}` )
  }

  ngOnInit(): void {
  }

  onLogoClicked() {
    this.router.navigate(['/admin']);
    this.isChildComponentActivated = true;
  }

  onChildComponentActivate(event: any): void {
    this.isChildComponentActivated = true;
  }
}

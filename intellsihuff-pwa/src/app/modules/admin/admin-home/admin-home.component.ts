import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  @ViewChild('routerOutlet', { static: true }) routerOutlet: RouterOutlet;

  isChildComponentActivated: boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogoClicked() {
    this.router.navigate(['/admin']);
    this.isChildComponentActivated = false;

  }

  onChildComponentActivate(event: any): void {
    this.isChildComponentActivated = true;
  }

}

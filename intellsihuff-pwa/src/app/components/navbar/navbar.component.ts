import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser, UserRole } from 'src/app/modules/authentication/auth.model';
import { UserConstant } from 'src/app/modules/user/user-constant';
import { UserSettingService } from 'src/app/modules/user/user-setting.service';
import { HelperService } from 'src/app/universal/helper.service';
import { NgxPubSubService } from 'src/app/universal/pub-sub';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" routerLink="/home">
      <!-- <img src="assets/images/logo-bg.png" alt="">   -->
    </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"  routerLink="/admin" *ngIf="currentUser?.role == userRole.ADMIN">
          <a class="nav-link" [class.active]="activePage == 'admin-home'">
            <i class="fas fa-user-shield"></i>
          </a>
        </li>
        <li class="nav-item" (click)="onHomeClicked()">
          <a class="nav-link" [class.active]="activePage == 'home'">
            <i class="fas fa-home"></i>
          </a>
        </li>

        <li class="nav-item dropdown"  role="menu">
          <a class="nav-link dropdown-toggle" 
            id="navbarDropdownMenuLink" role="button" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{currentUser?.name}}
            <!-- <i class="fas fa-user"></i> -->
          </a>

          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li class="nav-item">
              <a class="nav-link" [class.active]="activePage == 'edit-profile'" 
                [routerLink]="['/edit-profile']" 
                  [queryParams]="{ id: currentUser?.id }"
                    queryParamsHandling="merge" style="color: var(--color-primary);">
                    PROFILE
                    <i class="fas fa-user"></i>
                  </a>
            </li>

            <li class="nav-item">
              <a class="nav-link text-danger"  (click)="onLogOutClicked()">
                LOG OUT
                <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </div>
        </li>
      </ul>
    </div>
  </nav>

  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  currentUser: IUser;
  userRole = UserRole;
  activePage: string = 'home';
  subscription: Subscription;

  @Input() 
    showNav: boolean = false;
  constructor(
    private userSettingSvc: UserSettingService,
    private helperSvc: HelperService,
    private router: Router,
    private pubSub: NgxPubSubService

  ) { }

  async ngOnInit() {
    await this._getCurrentUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onHomeClicked() {
    this.router.navigate(['/home']);
  }

  async onLogOutClicked() {
    const resp = await this.helperSvc.presentConfirmDialogue('Are you sure', 'You want to Logout?', 'warning');
    if(!resp) {
      return;
    }

    this.pubSub.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { 
      clearCache: true
    });
  }

  private async _getCurrentUser() {
    try {
      const user: any = await this.userSettingSvc.getCurrentUser();
      this.currentUser = user;
      this.currentUser.name = this.currentUser.name.toUpperCase();
    } catch (error) {
    }
  }

}

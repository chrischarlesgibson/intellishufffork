import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser, UserRole } from 'src/app/modules/user/authentication/user.model';
import { UserSettingService } from 'src/app/modules/user/user-setting.service';
import { HelperService } from 'src/app/universal/helper.service';

@Component({
  selector: 'app-navbar',
  template: `

    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
      <div class="container">
        <button class="navbar-toggler" type="button" (click)="toggleMenu()">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <a class="navbar-brand" routerLink="/home">
          {{currentUser.institution.name}}
        </a>
      
        <div class="collapse navbar-collapse" [ngClass]="{'show': isMenuOpen}">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" *ngIf="currentUser?.role === userRole.ADMIN" routerLink="/admin">
              <a class="nav-link" [class.active]="activePage == 'admin-home'">Admin</a>
            </li>
            <li class="nav-item" (click)="onHomeClicked()">
              <a class="nav-link" [class.active]="activePage == 'home'">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/home/contact" [class.active]="activePage == 'contact'">Contact</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" 
                id="navbarDropdownMenuLink" role="button" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{currentUser.name}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li class="nav-item">
                  <a class="nav-link text-danger"  (click)="onLogOutClicked()">log out</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link"  [routerLink]="['/register']" [queryParams]="{ id: currentUser.id }" style="color: var(--color-primary);">Profile</a>
                </li>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {
  isMenuOpen = false;
  currentUser: IUser;
  userRole = UserRole;
  activePage: string = 'home';
  subscription: Subscription;

  activeAccordionItem: number | null = null;

  @Input() 
    showNav: boolean = false;
  constructor(
    private userSettingSvc: UserSettingService,
    private helperSvc: HelperService,
    private router: Router
  ) {


    console.log('navbar initialzied');
    
  }

  async ngOnInit() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this._getUrl();
    //   }
    // });
    await this._getCurrentUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  abc() {
    document.body.classList.toggle('dark-mode');
  }

  onHomeClicked() {
    this.router.navigate(['/home']);
  }

  async onLogOutClicked() {
    this.helperSvc.presentConfirationmDialogue();
  }

  private _getUrl() {
    const currentUrl = location.href;
    // this.activePage = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  }

  private async _getCurrentUser() {
    try {
      const user: any = await this.userSettingSvc.getCurrentUser();
      this.currentUser = user;
    } catch (error) {
      console.error('Error retrieving current user:', error);
      // Additional error handling if needed, such as displaying an error message.
    }
  }

  toggleAccordionItem(itemIndex: number): void {
    if (this.activeAccordionItem === itemIndex) {
      this.activeAccordionItem = null;
    } else {
      this.activeAccordionItem = itemIndex;
    }
  }
  
  
}

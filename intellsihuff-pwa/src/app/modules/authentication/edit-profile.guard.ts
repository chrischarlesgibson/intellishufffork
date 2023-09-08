import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserSettingService } from '../user/user-setting.service';

@Injectable()
export class EditProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSettingSvc: UserSettingService,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, //   : Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree
  ) {
    const canActivate = await this.userSettingSvc.canActivate();
    if (canActivate && route.queryParams['id']) {
      return true; // Allow access to the edit profile page
    } else {
      this.router.navigate(['/register']); // Redirect to a different page or handle unauthorized access
      return false;
    }
  }
}

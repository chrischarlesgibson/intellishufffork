import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserSettingService } from '../user/user-setting.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private userSettingSvc: UserSettingService,
    private router: Router,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, //  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  ) {
    const user = <any>await this.userSettingSvc.getCurrentUser();
    let isAdmin = false;
    if (user) {
      user.roles.filter((r): any => {
        if (r.role.includes('admin')) {
          isAdmin = true;
        }
      });
      if (isAdmin) {
        return true;
      }
    }

    this.router.navigate(['/403']);
    return false;
  }
}

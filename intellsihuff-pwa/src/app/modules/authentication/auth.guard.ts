import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserSettingService } from '../user/user-setting.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private userSettingSvc: UserSettingService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, //   : Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree
  ) {
    return this.userSettingSvc.canActivate();
  }
}

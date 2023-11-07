import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import { UserSettingService } from '../user/user-setting.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements Resolve<any> {
  constructor(
    private userService: AuthService,
    private userSettingService: UserSettingService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const idFromParams = route.queryParamMap.get('id');
    const user = await this.userSettingService.canActivate();

    const flag = user || idFromParams;

    if (flag) {
      return this.userSettingService.getCurrentUser();
    } else {
      // Handle the case where userId is missing (e.g., redirect to another page or show an error)
      // You can return an empty object, null, or handle it as needed
      return null;
    }
  }
}

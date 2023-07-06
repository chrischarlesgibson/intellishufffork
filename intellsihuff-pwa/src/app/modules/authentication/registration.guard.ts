import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserSettingService } from "../user/user-setting.service";

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSettingSvc: UserSettingService
  ) {}
    
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  //   : Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree 
  {
    const user = await this.userSettingSvc.canActivate();

    if(user && state.url.includes('id')) {
      this.router.navigate(['/login']);
      return false;  
    }

    return true;
  }
}

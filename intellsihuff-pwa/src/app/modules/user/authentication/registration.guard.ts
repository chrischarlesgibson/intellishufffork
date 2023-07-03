import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}
    
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  //   : Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree 
  {
    if(state.url.includes('id')) {
      this.router.navigate(['/login']);
      return false;  
    }

    return true;
  }
}

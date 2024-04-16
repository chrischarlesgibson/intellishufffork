import { Injectable, OnInit } from "@angular/core"
import { UserConstant } from "../user/user-constant";
import { IUser } from "./auth.model";
import { FacebookLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";

declare const FB: any;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationFacebookService implements OnInit {
    user: any;

    constructor(
        private socialAuthService: SocialAuthService
    ) {  }

    ngOnInit() {
        this.socialAuthService.authState.subscribe( ( user ) => {
            this.user = user;
        });
    }

    login(): Promise<IUser>{
        
        return new Promise(async (resolve, reject) => {
            try {
                await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

            } catch (e) {
                let res = <{ accessToken: { token: any } }>e;
                if(res.accessToken && !res.accessToken.token) {
                    reject();
                }
                reject(e);
            }
        });
    }

    async logout() {
        try {
      
        } catch(e) {
            //ignore...
        }
    }
}
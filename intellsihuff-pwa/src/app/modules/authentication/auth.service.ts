import { BaseService } from 'src/app/universal/base.service';
import {
  ILoginParams,
  IRegistrationParams,
  IUser,
  Ilogin,
  LoginType,
  UserRole,
  UserStatus,
} from './auth.model';
import { IResponse, Icon } from 'src/app/universal/shared.model';
import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(
    private socialAuthService: SocialAuthService
  ) {
    super();
  }

  uploadLogo(image) {
    return this.postData<any>({
      url: `institution/uploadLogo`,
      body: image,
    });
  }

  async getNewAccessToken() {
    const refreshToken = await this.userSettingSvc.getRefreshToken();
    return this.postData({
      url: `user/generateAccessToken`,
      body: {
        args: refreshToken,
      },
    });
  }

  getAllUsers() {
    return this.getData<IUser[]>({
      url: `user/getAllUsers`,
    });
  }

  getCurrentUser(id: number) {
    return this.getData<IUser>({
      url: `user/getCurrentUser?id=${id}`,
    });
  }

  regsiter(args: IRegistrationParams) {
    return this.postData<IResponse<any>>({
      url: `user/register`,
      body: {
        ...args,
      },
    });
  }

  async login(args: Ilogin, externalUser?) {
    this.helperSvc.presentLoader('Signing In');
    try {
      let response: IResponse<IUser> = {};
      switch (args.loginType) {
        case LoginType.STANDARD:
          response = await this.authenticate({
            email: args.email,
            password: args.password,
            loginType: args.loginType,
          });
        break;
      }

      if(args.loginType !== LoginType.STANDARD) {
        // debugger
        let regRes = await this.regsiter({ 
          email: externalUser.email, 
          name: externalUser.name, 
          externalAuth: externalUser.idToken,
          loginType: args.loginType,
          status: UserStatus.PENDING
        });
        
        if(regRes.data) {
          response = regRes;
        } else {
          return null;
        }
      }

      if (!response) {
        return null;
      }
      
      return this._handleLoginResponse(
        {
          loginType: args.loginType as LoginType,
          user: response.data as IUser,
        },
        response.refresh_token,
        response.access_token,
      );
    } catch (e: any) {
      if(!e) {
        return;
      }

      if(e.status == 400) {
         this.helperSvc.presentAlert(e.statusText, Icon.ERROR);
        return;
      }

      // let msg = e.toString();
      // if(e.message) {
      //   msg = e.message;
      // } else if(e.error) {
      //   msg = e.error.toString();
      // }
      // if(e.error?.error_description) {
      //   msg += "\n" + e.error.error_description;
      // }
      // await this.helperSvc.presentToast(msg, false);

    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  authenticate(args: Ilogin) {
    return this.postData<IUser>({
      url: `user/authenticate`,
      body: {
        ...args,
      },
    });
  }

  changeRole(args: IUser, role: UserRole) {
    return this.postData({
      url: `user/changeRole`,
      body: {
        user: args,
        role: role,
      },
    });
  }

  changeStatus(args: IUser, status: UserStatus) {
    return this.postData({
      url: `user/changeStatus`,
      body: {
        user: args,
        status: status,
      },
    });
  }

  sendMail(args: { to: string; subject: string }) {
    return this.postData<IResponse<any>>({
      url: `user/sendMail`,
      body: {
        ...args,
      },
    });
  }

  updateTourStatus(args: IUser) {
    return this.postData({
      url: `user/updateTourStatus`,
      body: {
        ...args,
      },
    });
  }

  logoutEverywhere(username?) {
    return new Promise(async (resolve, reject) => {
      // const loginType = await this.userSettingSvc.getLoggedInMethod();
      // switch(loginType) {
      //     case LoginType.GOOGLE:
      //       await this.googleAuthSvc.logout();
      //     break;
      //     case LoginType.FACEBOOK:
      //       await this.facebookAuthSvc.logout();
      //     break;
      // }

      if (!username) {
        username = await this.userSettingSvc.getCurrentUser();
      }

      if (!username) {
        return;
      }

      try {
      } catch (e) {} //ignore...

      await Promise.all([
        // this.userSettingSvc.removeUserProfileLocal(username),
        this.userSettingSvc.removeAccessToken(),
        this.userSettingSvc.removeRefreshToken(),
        this.userSettingSvc.removeCurrentUser(),
        // this.userSettingSvc.removeLoggedInMethod(),
        // this.userSettingSvc.removeCurrentUserPassword(),
      ]);

      // this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT);
      resolve(null);
    });
  }

  private async _handleLoginResponse(
    args: ILoginParams,
    refresh_token,
    access_token,
  ) {
    const promises: any = [];
    // let profilePromise = this.userSettingSvc.putUserProfileLocal(args.user);
    // promises.push(profilePromise);
    

    let loginTypePromise = this.userSettingSvc.putLoggedInMethod(args.loginType);
    promises.push(loginTypePromise);

    if(args.loginType == LoginType.STANDARD) {
      //TODO: need to remvoe storing password
      // let passwordPromise =  this.userSettingSvc.putCurrentUserPassword(args.password);
      // promises.push(passwordPromise);
    }

    let currentUserPromise = this.userSettingSvc.putCurrentUser(args.user);
    promises.push(currentUserPromise);

    const tokenPromise = this.userSettingSvc.putAccessToken(access_token);
    promises.push(tokenPromise);

    
    const refreeshtokenPromise = this.userSettingSvc.putRefreshToken(refresh_token);
    promises.push(refreeshtokenPromise);

    try {
      await Promise.all(promises);

      //fire the user loggedin event
      const profile = this.userSettingSvc.setUserDefaults(args.user);
      return profile;
    } catch(e) {
      throw e;
    }
  }
}

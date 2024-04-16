import { Injectable } from '@angular/core';
import { AppSettingService } from 'src/app/universal/app-setting.service';
import { UserConstant } from './user-constant';
import { Router } from '@angular/router';
import { IUser } from '../authentication/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService extends AppSettingService {
  constructor(private router: Router) {
    super();
  }

  putAccessToken(token: any) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_ACCESS_TOKEN,
        value: token,
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_ACCESS_TOKEN,
          token
        );
      });
  }

  removeAccessToken() {
    return this.dbService
      .remove(this.schemaSvc.tables.setting, UserConstant.KEY_ACCESS_TOKEN)
      .then(() => {
        AppSettingService.settingCache.delete(UserConstant.KEY_ACCESS_TOKEN);
      });
  }

  getAccessToken() {
    return this.get<string>(UserConstant.KEY_ACCESS_TOKEN).then((token) => {
      return token;
    });
  }
  getRefreshToken() {
    return this.get<string>(UserConstant.KEY_REFRESH_TOKEN).then((token) => {
      return token;
    });
  }

  removeRefreshToken() {
    return this.dbService
      .remove(this.schemaSvc.tables.setting, UserConstant.KEY_REFRESH_TOKEN)
      .then(() => {
        AppSettingService.settingCache.delete(UserConstant.KEY_REFRESH_TOKEN);
      });
  }

  putRefreshToken(refreshToken: any) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_REFRESH_TOKEN,
        value: refreshToken,
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_REFRESH_TOKEN,
          refreshToken
        );
      });
  }

  //   async getRefreshToken() {
  //       return (await this.getUserProfileLocal())?.refresh_token;
  //   }

  putFingerprintEnabled(value = true) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_FINGERPRINT_ENABLED,
        value: value == true ? 'yes' : 'no',
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_FINGERPRINT_ENABLED,
          value
        );
      });
  }

  getFingerprintEnabled() {
    return this.get(UserConstant.KEY_FINGERPRINT_ENABLED).then((value) => {
      if (typeof value === 'undefined' || value === null) {
        return value;
      }
      return value == 'yes' || value == true;
    });
  }

  getCurrentUser() {
    return this.get<string>(UserConstant.KEY_CURRENT_USER);
  }

  putCurrentUser(values) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_CURRENT_USER,
        value: values,
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_CURRENT_USER,
          values
        );
      });
  }

  removeCurrentUser() {
    return this.dbService
      .remove(this.schemaSvc.tables.setting, UserConstant.KEY_CURRENT_USER)
      .then(() => {
        AppSettingService.settingCache.delete(UserConstant.KEY_CURRENT_USER);
      });
  }

  // getLoggedInMethod(): Promise<LoginType> {
  //     return this.get(UserConstant.KEY_LOGGEDIN_METHOD)
  //         .then(loggedInMethod => {
  //             return <any>loggedInMethod;
  //         });
  // }

  putLoggedInMethod(values) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_LOGGEDIN_METHOD,
        value: values,
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_LOGGEDIN_METHOD,
          values
        );
      });
  }

  removeLoggedInMethod() {
    return this.dbService
      .remove(this.schemaSvc.tables.setting, UserConstant.KEY_LOGGEDIN_METHOD)
      .then(() => {
        AppSettingService.settingCache.delete(UserConstant.KEY_LOGGEDIN_METHOD);
      });
  }

  putCurrentUserPassword(values) {
    return this.dbService
      .putLocal(this.schemaSvc.tables.setting, {
        key: UserConstant.KEY_CURRENT_USER_PASSWORD,
        value: values,
      })
      .then(() => {
        AppSettingService.settingCache.set(
          UserConstant.KEY_CURRENT_USER_PASSWORD,
          values
        );
      });
  }

  removeCurrentUserPassword() {
    return this.dbService
      .remove(
        this.schemaSvc.tables.setting,
        UserConstant.KEY_CURRENT_USER_PASSWORD
      )
      .then(() => {
        AppSettingService.settingCache.delete(
          UserConstant.KEY_CURRENT_USER_PASSWORD
        );
      });
  }

  getCurrentUserPassword() {
    return this.get<string>(UserConstant.KEY_CURRENT_USER_PASSWORD).then(
      (currentUserPassword) => {
        return currentUserPassword;
      }
    );
  }

  async getUserProfileLocal(username?): Promise<IUser> {
    return new Promise<IUser>(async (resolve, reject) => {
      if (!username) {
        username = await this.getCurrentUser();
      }
      if (!username) {
        resolve({} as IUser);
        return;
      }

      username = username.toLowerCase();
      let profile = await this.dbService.get<IUser>(
        this.schemaSvc.tables.user,
        username
      );
      profile = this.setUserDefaults(profile as IUser);

      resolve(profile as IUser);
    });
  }

  removeUserProfileLocal(username) {
    username = username.toLowerCase();
    return this.dbService.remove(this.schemaSvc.tables.user, username);
  }

  putUserProfileLocal(user: IUser) {
    user.email = user.email.toLowerCase();
    return this.dbService.putLocal(this.schemaSvc.tables.user, user);
  }

  setUserDefaults(user: IUser): any {
    if (!user) {
      return;
    }

    const profile: IUser = { ...user };
    // if(profile.photo) {
    //     profile.photoStyle = `url('${profile.photo}')`;
    // }

    return profile;
  }

  async canActivate() {
    const user = await this.getCurrentUser();
    if (user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  // async displayAuthModal(args?: { viewStep?, resetPasswordToken?, waitForDismiss? }) {
  //     if(!args) {
  //         args = {};
  //     }

  //     return new Promise<any>(async (resolve, reject) => {
  //         const modal = await this.modalCtrl.create({
  //             component: AuthenticationOptionsComponent,
  //             componentProps: {
  //                 ...args
  //             },
  //             cssClass: 'auth-options',
  //             backdropDismiss: false,
  //             mode: 'md'
  //         });
  //         await modal.present();

  //         if(!args.waitForDismiss) {
  //             resolve(null);
  //             return;
  //         }

  //         const { data } = await modal.onDidDismiss();
  //         resolve(data);
  //     });
  // }
}

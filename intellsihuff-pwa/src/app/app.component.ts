import {
  Component,
  OnInit,
} from '@angular/core';
import { HelperService } from './universal/helper.service';
import { UserSettingService } from './modules/user/user-setting.service';
import { NgxPubSubService } from './universal/pub-sub';
import { UserConstant } from './modules/user/user-constant';
import { IResponse, Icon } from './universal/shared.model';
import { AppConstant } from './universal/app-constant';
import { AuthService } from './modules/authentication/auth.service';
import { IRegistrationParams, IUser, LoginType } from './modules/authentication/auth.model';
import { AppSettingService } from './universal/app-setting.service';
import { log } from 'console';
import { Platform } from '@angular/cdk/platform';
import { NavigationStart, Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  existingRouteUrl: any = null;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private userSettingSvc: UserSettingService,
    private router: Router,
    private pubsubSvc: NgxPubSubService,
    private userSvc: AuthService,
    private helperSvc: HelperService,
    private appSettingSvc: AppSettingService,
    private platform: Platform,

  ) {
    this.initializeWeb();
  }


  shouldShowNavbar() {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') ||
      currentUrl.includes('/register') ||
      currentUrl.includes('404') ||
      currentUrl.includes('403')
      ? false
      : true;
  }

  initializeWeb() {
    this.router.events.subscribe(async (val) => {
      if (val instanceof NavigationStart) {
        const urls = val.url.split('/').filter((u) => u.length);
        if (urls.length) {
          this.existingRouteUrl = val.url;
        }
      }
    });

    this._subscribeToEvents();
  }

  private async _subscribeToEvents() {
    this.pubsubSvc.subscribe(AppConstant.EVENT_DB_INITIALIZED, async () => {
      if (AppConstant.DEBUG) {
        console.log('Event received: EVENT_DB_INITIALIZED');
      }
      await this._setDefaults();
    });

    // this.pubsubSvc.subscribe(UserConstant.EVENT_USER_DISPLAY_AUTH_MODAL
    //   , async (args?: { resetPasswordToken?, viewStep? }) => {
    //   if(AppConstant.DEBUG) {
    //     console.log('Event received: EVENT_USER_DISPLAY_AUTH_MODAL: args', args);
    //   }

    //   if(!args) {
    //     args = {};
    //   }

    //   await this.userSettingSvc.displayAuthModal({
    //     resetPasswordToken: args.resetPasswordToken,
    //     viewStep: args.viewStep
    //   });
    // });

    // this.pubsubSvc.subscribe(AppConstant.EVENT_LANGUAGE_CHANGED, async (params) => {
    //   if(AppConstant.DEBUG) {
    //     console.log('EVENT_LANGUAGE_CHANGED', params);
    //   }
    //   const { wkLangauge, reload, isRtl } = params;
    //   if(reload) {
    //     SplashScreen.show();

    //     // make sure we are in root page before reoloading, just incase if user tries to change the language from inner page
    //     await this._navigateTo('/home', true);
    //     setTimeout(() => {
    //       this.document.location.reload();
    //     });
    //   } else {
    //     this.document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    //     this.workingLanguage = wkLangauge;

    //     setTimeout(() => {
    //       this.renderer.addClass(document.body, wkLangauge);
    //     });
    //   }
    // });

    this.pubsubSvc.subscribe(
      UserConstant.EVENT_USER_LOGGEDIN_CLICKED,
      async (params: { email, password, loginType } ) => {
        if (AppConstant.DEBUG) {
          console.log(
            'AppComponent: EVENT_USER_LOGGEDIN_CLICKED: params',
            params,
          );
        }
        let user: IUser | undefined;
        try {
          user = await this.userSvc.login({
            email: params.email,
            password: params.password,
            loginType: params.loginType
          }, params);

        } catch (error) {

        }
        
        if (!user) {
          return;
        }

        if (!user?.status) {
          // this.helperSvc.presentAlert(user.message , SweetAlertIcon.WARNING);
        }
        this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN, {
          user: user,
          redirectToHome: true,
          displayWelcomeMessage: true
        });
      },
    );

    this.pubsubSvc.subscribe(
      UserConstant.EVENT_USER_LOGGEDIN,
      async (params: {
        user: IUser;
        redirectToHome?: boolean;
        displayWelcomeMessage?: boolean;
        access_token: string;
        refresh_token: string;
      }) => {
        if (AppConstant.DEBUG) {
          console.log('AppComponent: EVENT_USER_LOGGEDIN: params', params);
        }
        if (params.redirectToHome) {
          this._navigateTo('/home');
        }
      },
    );

    this.pubsubSvc.subscribe(
      UserConstant.EVENT_USER_LOGGEDOUT,
      async (args: { clearCache; displayLoginDialog; displayMessage }) => {
        if (AppConstant.DEBUG) {
          console.log('AppComponent: EVENT_USER_LOGGEDOUT: args', args);
        }
        // this.currentUser = null;

        //redirect to login...
        await this._navigateTo('/login', null, true);

        if (args?.clearCache) {
          await this._logout();
        }

        if (args?.displayMessage) {
          // const msg = await this.localizationSvc.getResource('user.login.logged_out');
          // await this.helperSvc.presentToast(msg);
        }

        if (args?.displayLoginDialog) {
          const canActivate = await this.userSettingSvc.canActivate();
          if (!canActivate) {
            return;
          }
        }
      },
    );

    // this.pubsubSvc.subscribe(UserConstant.EVENT_USER_FORGOT_PASSWORD
    //   , async (params: { username }) => {
    //   if(AppConstant.DEBUG) {
    //     console.log('AppComponent: EVENT_USER_FORGOT_PASSWORD: params', params);
    //   }

    //   const response = await this.userSvc.forgotPassword({
    //     username: params.username
    //   });

    //   const msg = await this.localizationSvc.getResource('user.forgot_password_sent');
    //   await this.helperSvc.presentToast(msg);
    // });

    // this.pubsubSvc.subscribe(UserConstant.EVENT_USER_RESET_PASSWORD
    //   , async (params: { resetPasswordToken, newPassword }) => {
    //   if(AppConstant.DEBUG) {
    //     console.log('AppComponent: EVENT_USER_RESET_PASSWORD: params', params);
    //   }

    //   try {
    //     const result = await this.userSvc.resetPassword({
    //       resetPasswordToken: params.resetPasswordToken,
    //       newPassword: params.newPassword
    //     });

    //     if(result) {
    //       await this.helperSvc.presentToastGenericSuccess();
    //     } else {
    //       //TODO: need to update the message
    //       await this.helperSvc.presentToastGenericError();
    //     }
    //   } catch(e) {
    //     await this.helperSvc.presentToastGenericError();
    //   }
    // });

    // this.pubsubSvc.subscribe(AppConstant.EVENT_NAVIGATE_TO, async (params) => {
    //   await this._navigateTo(params.url);
    // });
  }

  private async _setDefaults() {
    const res = await Promise.all([
      this.appSettingSvc.getWorkingLanguage(),
      this._configureWeb()
    ]);

    let wkl = res[0];
    if (!wkl) {
      wkl = 'en';
      await this.appSettingSvc.putWorkingLanguage(wkl);
    }

    this.pubsubSvc.publishEvent(AppConstant.EVENT_LANGUAGE_CHANGED, {
      wkLangauge: wkl,
      reload: false,
      isRtl: false,
    });

    if (this.existingRouteUrl) {
      await this._navigateTo(this.existingRouteUrl);
      return;
    }

    await this._navigateTo('/home');
  }

  private async _navigateTo(path, args?, replaceUrl = false) {
    if (!args) {
      await this.router.navigate([path], { replaceUrl: replaceUrl });
    } else {
      await this.router.navigate([path, args], { replaceUrl: replaceUrl });
    }
  }

  private async _logout() {

    try {
      await this.userSvc.logoutEverywhere();
    } catch (e) {
    } finally {
    }
    // }
  }

  private async _configureWeb() {
    if(!this.platform.isBrowser) {
      return;
    }

    // await this.userSvc.init();
  }
}

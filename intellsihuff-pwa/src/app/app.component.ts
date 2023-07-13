import { Component} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HelperService } from './universal/helper.service';
import { UserSettingService } from './modules/user/user-setting.service';
import { NgxPubSubService } from './universal/pub-sub';
import { UserConstant } from './modules/user/user-constant';
import { IResponse } from './universal/shared.model';
import { AppConstant } from './universal/app-constant';
import { AuthService } from './modules/authentication/auth.service';
import { IUser } from './modules/authentication/auth.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {    
  existingRouteUrl:any = null;

  constructor(
    private userSettingSvc: UserSettingService,
    private router: Router,
    private pubsubSvc: NgxPubSubService,
    private userSvc: AuthService,
    private helperSvc: HelperService
  ) { 
    this.initializeWeb();
  }

  shouldShowNavbar() {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') ||
        currentUrl.includes('/register') ||
          currentUrl.includes('/admin') ? false : true;
  }

   initializeWeb() {
    this.router.events.subscribe(async (val) => {
      if(val instanceof NavigationStart) {
        const urls = val.url.split('/').filter(u => u.length); 
        if(urls.length) {
          this.existingRouteUrl = val.url;
        }
        
      }
    });
    
   this._subscribeToEvents();
  }
 
  private async _subscribeToEvents() {

    this.pubsubSvc.subscribe(AppConstant.EVENT_DB_INITIALIZED, async () => {
      if(AppConstant.DEBUG) {
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

    this.pubsubSvc.subscribe(UserConstant.EVENT_USER_PROFILE_UPDATED
      , async (user: IUser) => {
      if(AppConstant.DEBUG) {
        console.log('AppComponent: EVENT_USER_PROFILE_UPDATED: params', user);
      }

      await this.userSettingSvc.removeCurrentUser();
      await this.userSettingSvc.putCurrentUser(user);
      // this.currentUser = profile;
    });

    this.pubsubSvc.subscribe(UserConstant.EVENT_USER_LOGGEDIN_CLICKED
      , async (params: { email, password }) => {
      if(AppConstant.DEBUG) {
        console.log('AppComponent: EVENT_USER_LOGGEDIN_CLICKED: params', params);
      }
      
      let currentUser: IUser | undefined;
      let response: IResponse<IUser> | undefined;

      const user = {
        email: params.email,
        password: params.password
      }
      
      this.helperSvc.presentLoader('Signing In');
      try {
        response = await this.userSvc.login(user);
        currentUser = response.data as IUser;   
     
      } catch (error) {
        
      } finally {
        this.helperSvc.dismissLoader();
      }
        
      if(!response) {
        return;
      }
      
      if(!response?.status) {
        this.helperSvc.presentAlert(response.message, 'warning');
      }

      await this.userSettingSvc.putCurrentUser(currentUser as IUser);

      this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN, { 
        user: currentUser, 
        redirectToHome: true,
        displayWelcomeMessage: true
      }); 

    });

    this.pubsubSvc.subscribe(UserConstant.EVENT_USER_LOGGEDIN
      , async (params: { user: IUser, redirectToHome?: boolean, displayWelcomeMessage?: boolean }) => {
      if(AppConstant.DEBUG) {
        console.log('AppComponent: EVENT_USER_LOGGEDIN: params', params);
      }

      if(params.redirectToHome) {
        this._navigateTo('/home');
      }
    });


    
    this.pubsubSvc.subscribe(UserConstant.EVENT_USER_LOGGEDOUT
      , async (args: { clearCache, displayLoginDialog, displayMessage }) => {
      if(AppConstant.DEBUG) {
        console.log('AppComponent: EVENT_USER_LOGGEDOUT: args', args);
      }
      // this.currentUser = null;

      //redirect to login...
      await this._navigateTo('/login', null, true);

      if(args?.clearCache) {
        await this._logout();
      }

      if(args?.displayMessage) {
        // const msg = await this.localizationSvc.getResource('user.login.logged_out');
        // await this.helperSvc.presentToast(msg);
      }

      if(args?.displayLoginDialog) {
        const canActivate = await this.userSettingSvc.canActivate();
        if(!canActivate) {
          return;
        }
      }
    });

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
    if(this.existingRouteUrl) {
      await this._navigateTo(this.existingRouteUrl);
      return;
    }

    await this._navigateTo('/home');
  }

  private async _navigateTo(path, args?, replaceUrl = false) {
    if(!args) {
      await this.router.navigate([path], { replaceUrl: replaceUrl });
    } else {
      await this.router.navigate([path, args], { replaceUrl: replaceUrl });
    }
  }

  private async _logout() {
    // const resp = await this.helperSvc.presentConfirmDialog();
    // if(resp) {
      // const loader = await this.helperSvc.loader;
      // await loader.dismiss();

      try {
        await this.userSvc.logoutEverywhere();
      } catch(e) {

      } finally {
        // await loader.dismiss();
      }
    // }
  }
}

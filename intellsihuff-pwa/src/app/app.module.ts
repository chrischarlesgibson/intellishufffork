import { Injector, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppInjector } from './universal/app-injector';
import { UserModule } from './modules/user/user.module';
import { NgxPubSubService } from './universal/pub-sub';
import { AdminModule } from './modules/admin/admin.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './modules/authentication/auth.module';
import { NoDataModule } from './components/no-data/no-data.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { tokenInterceptor } from './modules/authentication/token-interceptor.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { UserConstant } from './modules/user/user-constant';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppConstant } from './universal/app-constant';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    NavbarModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !AppConstant.DEBUG
    })
  ],
  providers: [
    NgxPubSubService, 
    tokenInterceptor,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(UserConstant.GOOGLE_SIGNIN_CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // null ijector issue
  //avoid multiple instance of injector in case of inheritance
  //https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
  //https://stackoverflow.com/a/53185632
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}

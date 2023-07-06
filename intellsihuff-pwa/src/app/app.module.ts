import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppInjector } from './universal/app-injector';
import { UserModule } from './modules/user/user.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgxPubSubService } from './universal/pub-sub';
import { BaseService } from './universal/base.service';
import { AdminModule } from './modules/admin/admin-module.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot([]), // Make sure to include the `forRoot` method
    BrowserModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
    FontAwesomeModule
    // RouterModule,
  ],
  providers: [
    BaseService,
    NgxPubSubService
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

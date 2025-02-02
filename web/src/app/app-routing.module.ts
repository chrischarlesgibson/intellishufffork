import { NgModule } from '@angular/core';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { AuthRoutingModule } from './modules/authentication/auth-routing.module';

@NgModule({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  imports: [UserRoutingModule, AdminRoutingModule, AuthRoutingModule],
  exports: [UserRoutingModule, AdminRoutingModule, AuthRoutingModule],
})
export class AppRoutingModule {}

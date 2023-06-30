import { NgModule } from '@angular/core';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';

@NgModule({
  providers:[
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  imports: [UserRoutingModule, AdminRoutingModule],
  exports: [UserRoutingModule, AdminRoutingModule],
})
export class AppRoutingModule { }

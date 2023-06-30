import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';




@NgModule({
  declarations: [
    AdminHomeComponent,
    UserListingComponent
  ],
  imports: [
    AdminRoutingModule,
    ComponentsWithFormsModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }

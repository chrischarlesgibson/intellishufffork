import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { AddUserComponent } from './add-user/add-user.component';
import { InstitutionComponent } from './institution/institution.component';
import { SubjectsListingComponent } from './subjects/subjects-listing/subjects-listing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AdminHomeComponent,
    UserListingComponent,
    AddUserComponent,
    InstitutionComponent,
    SubjectsListingComponent
  ],
  imports: [
    AdminRoutingModule,
    ComponentsWithFormsModule,
    FontAwesomeModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }

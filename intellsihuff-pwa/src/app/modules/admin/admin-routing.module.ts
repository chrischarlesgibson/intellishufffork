import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AddUserComponent } from './add-user/add-user.component';
import { InstitutionComponent } from './institution/institution.component';
import { AuthGuard } from '../authentication/auth.guard';
import { SubjectsListingComponent } from './subjects/subjects-listing/subjects-listing.component';
import { RolesListingComponent } from './role/roles-listing/roles-listing.component';
import { AuthAdminGuard } from './auth-admin-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthAdminGuard],
    component: AdminHomeComponent,
    children: [
      {
        path: 'user-listing',
        component: UserListingComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'institution',
        component: InstitutionComponent,
      },
      {
        path: 'subjects-listing',
        component: SubjectsListingComponent,
      },
      {
        path: 'roles-listing',
        component: RolesListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

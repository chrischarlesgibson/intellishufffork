import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { UserListingComponent } from "./user-listing/user-listing.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ContactComponent } from "./contact/contact.component";
import { InstitutionComponent } from "./institution/institution.component";
import { AuthGuard } from "../authentication/auth.guard";

const routes: Routes = [
    {
        path: 'admin', canActivate: [AuthGuard], component: AdminHomeComponent,
        children: [
            {
                path: 'user-listing', component: UserListingComponent 
            },
            {
                path: 'add-user', component: AddUserComponent 
            },
            {
                path: 'contact', component: ContactComponent 
            },
            {
                path: 'institution', component: InstitutionComponent 
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../user/authentication/auth.guard";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { UserListingComponent } from "./user-listing/user-listing.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
    {
        path: 'admin', canActivate: [AuthGuard], component: AdminHomeComponent,
        children: [
            {
                path: 'user-listing', component: UserListingComponent 
            },
            {
                path: 'add-user', component: AddUserComponent 
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
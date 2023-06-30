import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../user/authentication/auth.guard";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { UserListingComponent } from "./user-listing/user-listing.component";

const routes: Routes = [
    {
        path: 'admin', canActivate: [AuthGuard], component: AdminHomeComponent,
        children: [
            {
                path: 'user-listing', component: UserListingComponent 
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
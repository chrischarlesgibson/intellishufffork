import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: 'edit-profile', canActivate: [AuthGuard], component: EditProfileComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

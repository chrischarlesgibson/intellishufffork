import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditProfileGuard } from './edit-profile.guard';

const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: 'user-profile', canActivate: [AuthGuard], component: RegisterComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

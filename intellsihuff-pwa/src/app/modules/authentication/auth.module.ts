import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EditProfileComponent],
  providers: [AuthService],
  imports: [AuthRoutingModule, ComponentsWithFormsModule],
  exports: [RouterModule],
})
export class AuthModule {}

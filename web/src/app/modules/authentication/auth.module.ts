import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileGuard } from './edit-profile.guard';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { EditProfileModule } from './edit-profile/edit-profile.module';

@NgModule({
  declarations: [],
  providers: [AuthService, EditProfileGuard],
  imports: [
    EditProfileModule,
    LoginModule,
    RegisterModule,
    AuthRoutingModule,
    ComponentsWithFormsModule,
  ],
  // exports: [RouterModule]
})
export class AuthModule {}

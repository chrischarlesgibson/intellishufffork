import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { EditProfileModule } from './edit-profile/edit-profile.module';

@NgModule({
  providers: [AuthService],
  imports: [
    LoginModule,
    RegisterModule,
    EditProfileModule,    
    AuthRoutingModule,  
  ],
  exports: [RouterModule],
})
export class AuthModule {}

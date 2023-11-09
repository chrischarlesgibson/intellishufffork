import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
// import {
//   GoogleSigninButtonModule,
//   SocialLoginModule,
// } from '@abacritt/angularx-social-login';
import { LoginRoutingModule } from './login.routing.mdoule';

@NgModule({
  declarations: [LoginComponent],
  imports: [ComponentsWithFormsModule, LoginRoutingModule],
})
export class LoginModule {}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ilogin, LoginType } from '../auth.model';
import { BasePage } from 'src/app/universal/base.page';
import { UserConstant } from '../../user/user-constant';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConstant } from 'src/app/universal/app-constant';
import { AuthenticationFacebookService } from '../authentication-facebook.service';
import {  SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
  formGroup: FormGroup;
  showPassword = false;
  LoginType = LoginType;
  socialUser: SocialUser;

  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private fbSvc: AuthenticationFacebookService,
    private socialAuthService: SocialAuthService,
    private authSvc: AuthService
  ) {
    super();
    this.titleService.setTitle(AppConstant.SITE_NAME);

    this.formGroup = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (AppConstant.DEBUG) {
      this.formGroup.controls.email.setValue('dev.faisalK@gmail.com');
      this.formGroup.controls.password.setValue('</>Intellishuff256');
    }

  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe( async (user) => {
      console.log('user', user);
      // await this.authSvc.login({ loginType: LoginType.GOOGLE }, user)
      this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN_CLICKED, {
        ...user,
        loginType: LoginType.GOOGLE
      });
    });
  }


  onRegisterClicked() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onFormSubmitted(data: Ilogin, loginType: LoginType) {
    this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN_CLICKED, {
      loginType,
      ...data,
    });
  }
}

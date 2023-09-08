import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ilogin } from '../auth.model';
import { BasePage } from 'src/app/universal/base.page';
import { UserConstant } from '../../user/user-constant';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConstant } from 'src/app/universal/app-constant';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage {
  formGroup: FormGroup;
  showPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
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

  onRegisterClicked() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onFormSubmitted(data: Ilogin) {
    this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN_CLICKED, {
      ...data,
    });
  }
}

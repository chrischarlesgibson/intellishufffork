import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IUser, Ilogin } from '../user.model';
import { HelperService } from 'src/app/universal/helper.service';
import { IResponse } from 'src/app/universal/shared.model';
import { UserSettingService } from '../../user-setting.service';
import { BasePage } from 'src/app/universal/base.page';
import { UserConstant } from '../../user-constant';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePage implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  showPassword = false;
  constructor(
    private formBuilder: FormBuilder,
     private authSvc: AuthService,
     private userSettingSvc: UserSettingService,
  ) {
    super();
    this.formGroup = formBuilder.group({
      email: ['dev.faisalK@gmail.com', [ Validators.required, Validators.email]],
      password: ['faisal256', Validators.required],
    });

  }

  ngOnInit()  {
   // it wont work in ngonintd

  }

  ngAfterViewInit(): void {
 
  }
  
  onRegisterClicked() {
    this.router.navigate(['/register'])
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  async onFormSubmitted(data: Ilogin) {
    console.log('clicked');
    
    this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_LOGGEDIN_CLICKED, { ...data });
  }


}

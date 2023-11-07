import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ilogin } from '../auth.model';
import { BasePage } from 'src/app/universal/base.page';
import { UserConstant } from '../../user/user-constant';

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
  ) {
    super();
    this.formGroup = formBuilder.group({
      email: ['dev.faisalK@gmail.com', [ Validators.required, Validators.email]],
      password: ['</>Intellishuff256', Validators.required],
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

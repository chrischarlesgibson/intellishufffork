import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister, IUser, InstitutionType, UserRole } from '../user.model';
import { AuthService } from '../auth.service';
import { HelperService } from 'src/app/universal/helper.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IResponse } from 'src/app/universal/shared.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  id: number;
  formGroup: FormGroup;
  user: IUser;
  showPassword = false;

  InstitutionType = InstitutionType;
  get fg() {
    return this.formGroup.controls;
  }
  constructor(
    private formBuilder: FormBuilder
    , private authSvc: AuthService
    , private helperSvc: HelperService
    , private route: ActivatedRoute
    , private router: Router
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
      institutionName: ['', Validators.required],
      institutionType: ['', Validators.required]
    });
    
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id) {
      this.user = await this.authSvc.getCurrentUser(this.id);
      
      if(this.user) {
        this._populateFormGroup();
      }
    }    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  onLoginClicked() {
    this.router.navigate(['/login'])
  }

  async onFormSubmitted(data: IRegister) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();
    const institution = {
      name: this.fg['institutionName'].value,
      type: this.fg['institutionType'].value,
    }

    const params =  {
      id: this.user?.id || undefined,
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
      status: data.status,
      institution: institution
    }
    
    try {
      const resp: IResponse<any> = await this.authSvc.regsiter(params);
      if(resp.status) {
        await this.helperSvc.presentAlert(resp.message, 'success') 
      } else {
        await this.helperSvc.presentAlert(resp.message, 'warning') 
      }
      
    } catch (error) {
      
    } finally {
      // await loader.dismiss();
    }
    
  }

  private  _populateFormGroup() {
   this.fg['name'].setValue(this.user.name);
   this.fg['email'].setValue(this.user.email);
   this.fg['password'].setValue(this.user.password);
   this.fg['institutionName'].setValue(this.user.institution.name);
   this.fg['institutionType'].setValue(this.user.institution.type);
  }
}

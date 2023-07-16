
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister, IUser, InstitutionType } from '../auth.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { IResponse } from 'src/app/universal/shared.model';
import { AppConstant } from 'src/app/universal/app-constant';
import { UserConstant } from '../../user/user-constant';
import { BasePage } from 'src/app/universal/base.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BasePage implements OnInit {
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
    , private route: ActivatedRoute
  ) {
    super();
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: [{value:'', disabled: true}],
      password: ['', Validators.required],
      institutionName: ['', Validators.required],
      institutionType: [{value:'', disabled: true}]
    });
    
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    
    if(this.id) {
      this.helperSvc.presentLoader('Fetching User');
      try {
        this.user = await this.authSvc.getCurrentUser(this.id);
      
        if(this.user) {
          this._populateFormGroup();
        }
      } catch (error) {
        
      } finally {
        this.helperSvc.dismissLoader();
      }
   
    }    

    if(AppConstant.DEBUG) {
      // this._preFill();
    }
  }



  async onFormSubmitted(data: IRegister) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();
    const institution = {
      name: this.fg['institutionName'].value,
      type: this.user.institution.type,
    }

    const params =  {
      id: this.user.id,
      email: this.user.email,
      name: data.name,
      password: data.password,
      role: data.role,
      status: data.status,
      institution: institution
    }

    this.helperSvc.presentLoader('Updating User');

    try {
      const resp: IResponse<any> = await this.authSvc.regsiter(params);
      if(resp.status) {
        await this.helperSvc.presentAlert(resp.message, 'success'); 
        this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_PROFILE_UPDATED , { ...resp.data } );
        
      } else {
        await this.helperSvc.presentAlert(resp.message, 'warning'); 
      }
      
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
    
  }

  private  _populateFormGroup() {
   this.fg['name'].setValue(this.user.name);
   this.fg['email'].setValue(this.user.email);
   this.fg['password'].setValue(this.user.password);
   this.fg['institutionName'].setValue(this.user.institution?.name);
   this.fg['institutionType'].setValue(this.user.institution?.type);
  }

}

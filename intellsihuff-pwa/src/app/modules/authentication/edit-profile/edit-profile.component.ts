import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IRegistrationParams,
  IRole,
  IUser,
  InstitutionType,
} from '../auth.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { IResponse, Icon } from 'src/app/universal/shared.model';
import { AppConstant } from 'src/app/universal/app-constant';
import { UserConstant } from '../../user/user-constant';
import { BasePage } from 'src/app/universal/base.page';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserSettingService } from '../../user/user-setting.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
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
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private titleService: Title,
    private userSettingSvc: UserSettingService,
  ) {
    super();
    this.titleService.setTitle(`Profile | ${AppConstant.SITE_NAME}`);

    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      password: ['', Validators.required],
      institutionName: ['', Validators.required],
      institutionType: [{ value: '', disabled: true }],
    });
  }

  async ngOnInit() {
    console.log('profile');

    this.route.data.subscribe((data) => {
      if (data) {
        this.helperSvc.presentLoader('Fetching User');
        try {
          this.user = data.userData;
          this._populateFormGroup();
        } catch (error: any) {
        } finally {
          this.helperSvc.dismissLoader();
        }
      }
    });

    if (AppConstant.DEBUG) {
      // this._preFill();
    }
  }

  async onFormSubmitted(data: IRegistrationParams) {
    const institution = {
      name: this.fg['institutionName'].value,
      type: this.user.institution.type,
    };

    const params = {
      id: this.user.id || undefined,
      email: this.user.email,
      name: data.name,
      roles: this.user.roles,
      password: data.password,
      status: data.status,
      institution: institution,
    };

    this.helperSvc.presentLoader('Updating User');

    try {
      const resp: IResponse<any> = await this.authSvc.regsiter(params);
      if (resp.status) {
        this.pubsubSvc.publishEvent(UserConstant.EVENT_USER_PROFILE_UPDATED, {
          ...resp.data,
        });
        this.helperSvc.presentAlert(resp.message, Icon.SUCCESS);
      } else {
        this.helperSvc.presentAlert(resp.message, Icon.WARNING);
      }
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

  private _populateFormGroup() {
    this.fg['name'].setValue(this.user.name);
    this.fg['email'].setValue(this.user.email);
    this.fg['password'].setValue(this.user.password);
    this.fg['institutionName'].setValue(this.user.institution?.name);
    this.fg['institutionType'].setValue(this.user.institution?.type);
  }
}

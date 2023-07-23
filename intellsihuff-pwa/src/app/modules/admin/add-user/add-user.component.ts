import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from 'src/app/universal/shared.model';
import { BasePage } from 'src/app/universal/base.page';
import { AuthService } from '../../authentication/auth.service';
import { IRegister, IRole, IUser, UserStatus } from '../../authentication/auth.model';
import { RoleService } from '../role/role.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BasePage implements OnInit, OnDestroy {
  formGroup: FormGroup;
  roles: any;
  private _subscription: Subscription;
  currentUser: IUser;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private roleSvc: RoleService,
    private route: ActivatedRoute

  ) {
    super();
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      isUserApproved: [false],
    });
  }


  async ngOnInit() {
    this._subscription = this.route.queryParams.subscribe( async (params) => {
      this.id = +params['id'];
      if(this.id) {
        await this._getCurrentUser(this.id);
        this._populateFg();
      }
    });

    const roles = await  this.roleSvc.getAll(); 
    this.roles = roles.data;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  get fg() {
    return this.formGroup.controls;
  }

  async onFormSubmitted(data: IRegister) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();
    
    const params =  {
      email: data.email,
      name: data.name,
      password: data.password,
      roles: data.roles,
      status: data.isUserApproved ? UserStatus.APPROVED : UserStatus.PENDING,
    }
    
    this.helperSvc.presentLoader('Saving user');
    try {
      const resp: IResponse<any> = await this.authSvc.regsiter(params);
      if(resp.status) {
        this.router.navigate(['/admin/user-listing']);

        await this.helperSvc.presentAlert(resp.message, 'success') 
      } else {
        await this.helperSvc.presentAlert(resp.message, 'warning') 
      }
      
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
    
  }


  private _populateFg() {
    this.fg['name'].setValue(this.currentUser.name);
    this.fg['email'].setValue(this.currentUser.email);
    this.fg['password'].setValue(this.currentUser.password);
    this.fg['roles'].setValue(this.currentUser.roles);
    this.fg['isUserApproved'].setValue(this.currentUser.status);
  }

  private async _getCurrentUser(userId) {
    this.currentUser = await this.authSvc.getCurrentUser(userId)
  }
}

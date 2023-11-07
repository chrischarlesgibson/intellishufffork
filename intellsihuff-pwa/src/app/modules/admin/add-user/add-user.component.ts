import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse, Icon } from 'src/app/universal/shared.model';
import { BasePage } from 'src/app/universal/base.page';
import { AuthService } from '../../authentication/auth.service';
import {
  IRegistrationParams,
  IRole,
  IUser,
  UserStatus,
} from '../../authentication/auth.model';
import { RoleService } from '../role/role.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild('select2') select2: ElementRef;

  formGroup: FormGroup;
  roles: IRole[] = [];
  currentUser: IUser;
  id: number;
  private _subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private roleSvc: RoleService,
    private route: ActivatedRoute,
  ) {
    super();
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      isUserApproved: [false],
    });
  }

  async ngOnInit() {
    this._subscription = this.route.queryParams.subscribe(async (params) => {
      this.id = params['id'];
      if (this.id) {
        await this._getCurrentUser(this.id);
        this._populateFg();
      }
    });

    const roles = await this.roleSvc.getAll();
    this.roles = [roles.data as IRole];
    console.log(this.roles);
  }

  ngAfterViewInit() {
    $(this.select2.nativeElement).select2();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    const selectElement = $(this.select2.nativeElement);
    selectElement.select2('destroy');
  }

  get fg() {
    return this.formGroup.controls;
  }

  async onFormSubmitted(data: IRegistrationParams) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();

    const params = {
      id: this.currentUser.id || undefined,
      email: data.email,
      name: data.name,
      password: data.password,
      roles: data.roles,
      status: data.isUserApproved ? UserStatus.APPROVED : UserStatus.PENDING,
    };

    this.helperSvc.presentLoader('Saving user');
    try {
      const resp: IResponse<any> = await this.authSvc.regsiter(params);
      if (resp.status) {
        this.helperSvc.presentAlert(resp.message, Icon.SUCCESS);
        this.router.navigate(['/admin/user-listing']);
      } else {
        this.helperSvc.presentAlert(resp.message, Icon.WARNING);
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
    this.fg['isUserApproved'].setValue(
      this.currentUser.status == UserStatus.APPROVED ? true : false,
    );
  }

  private async _getCurrentUser(userId) {
    this.currentUser = await this.authSvc.getCurrentUser(userId);
  }
}

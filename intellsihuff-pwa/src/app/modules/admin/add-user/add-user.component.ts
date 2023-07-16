import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from 'src/app/universal/shared.model';
import { BasePage } from 'src/app/universal/base.page';
import { AuthService } from '../../authentication/auth.service';
import { IRegister, UserStatus } from '../../authentication/auth.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BasePage {
formGroup: FormGroup;
/**
 *
 */
  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService

  ) {
    super();
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      isUserApproved: [false],
    });
    
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
      role: data.role,
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
}

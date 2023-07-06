import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/universal/helper.service';
import { AuthService } from '../../authentication/auth.service';
import { IUser, UserRole, UserStatus } from '../../authentication/auth.model';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  users: any;
  userStatus = UserStatus;
  userRole = UserRole;
  isCollapsed = false;

  constructor(
    private authSvc: AuthService,
   private helperSvc: HelperService

  ) { }

  async ngOnInit() {
    await this._getAllUsers('Fetching all users');
  }

  async onRoleChanged(user:IUser, ev: any) {
    const role = ev.target.value;
    try {
      await this.authSvc.changeRole(user, role);
      this.helperSvc.presentAlert(`Role successfully changed for ${user.email}`, 'success')
      await this._getAllUsers('Refetching...');

    } catch (error) {

    } finally {
      // await loader.dismiss();
    }
    
  }

  async onStatusChanged(user:IUser, ev: any) {
    // const loader = await this.helperSvc.loader;
    // await loader.present();

    const status = ev.target.value;
    try {
      await this.authSvc.changeStatus(user, status);
      this.helperSvc.presentAlert(`Status successfully changed to ${status} for ${user.email}`, 'success')

      // await this._getAllUsers('Refetching...');

    } catch (error) {
      
    } finally {
      // await loader.dismiss();
    }
  }

  private async _getAllUsers(loaderText) {
    this.helperSvc.presentLoader(loaderText);

    try {
      this.users = await this.authSvc.getAllUsers();

    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
  }

}

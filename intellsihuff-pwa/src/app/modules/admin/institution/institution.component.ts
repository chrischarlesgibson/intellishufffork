import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/universal/base.page';
import { UserSettingService } from '../../user/user-setting.service';
import { IUser, InstitutionType } from '../../authentication/auth.model';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss'],
})
export class InstitutionComponent extends BasePage implements OnInit {
  currentUser: IUser;
  InstitutionType = InstitutionType;
  selectedImage: File;
  fileName = '';

  constructor(
    private userSettingSvc: UserSettingService,
    private userSvc: AuthService,
  ) {
    super();
  }

  async ngOnInit() {
    await this._getCurrentUser();
  }

  onFileSelected(ev) {
    this.selectedImage = ev.target.files[0] as File;
  }

  async uploadImage(event: any) {
    
    if (this.selectedImage) {
      const fileName = this.selectedImage.name;

      const formData = new FormData();
      formData.append("thumbnail", this.selectedImage);
      console.log(formData);

      await this.userSvc.uploadLogo(
        this.selectedImage
      );
    }

 
  }

  private async _getCurrentUser() {
    const user: any = await this.userSettingSvc.getCurrentUser();
    this.currentUser = user;
  }
}

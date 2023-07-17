import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { BasePage } from 'src/app/universal/base.page';
import { IRole } from '../role.model';

@Component({
  selector: 'roles-listing',
  templateUrl: './roles-listing.component.html',
  styleUrls: ['./roles-listing.component.scss']
})
export class RolesListingComponent extends BasePage implements OnInit {
  roleFormGroup: FormGroup
  roles: IRole[];
  
  constructor(
    private formBuilder: FormBuilder,
    private roleSvc: RoleService
  ) {
    super();
    this.roleFormGroup = this.formBuilder.group({
      role: [null, Validators.required],
    });    
  }

  async ngOnInit() {
    await this._getAllRoles();
  }
  
  cancelEditing(role) {
    this.roles.map(s =>  {
      if(s.id == role.id) {
        s.isEditingMode = false
      }
    });
  }

  onEditSubjectClicked(role) {
    this.roles.map(s => role.id == s.id ? s.isEditingMode = true : s.isEditingMode = false );
  }

  async onAddSubjectClicked(data) {
    this.helperSvc.presentLoader('Adding role');
    try {
      const resp = await this.roleSvc.addRole(data);
      
      if(resp.status) {
        this.helperSvc.presentAlert(resp.message, 'success');
      } else {
        this.helperSvc.presentAlert(resp.message, 'warning');
      }
    } catch (error) {
      
    } finally {
      this.helperSvc.dismissLoader();
    }
  }


  private async  _getAllRoles() {
    const roles = await this.roleSvc.getAll();
    this.roles = roles.data as any;
  }
}

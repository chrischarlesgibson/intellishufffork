import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/universal/helper.service';
import { AuthService } from '../../authentication/auth.service';
import { Icon } from 'src/app/universal/shared.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private helperSvc: HelperService,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: [
        'bussiness.ef.kay99@gmail.com',
        [Validators.required, Validators.email],
      ],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onFormSubmitted(data: any) {
    const mail = {
      to: data.email,
      subject: data.message,
    };

    this.helperSvc.presentLoader('Sending mail');
    try {
      const resp: any = await this.authSvc.sendMail(mail);
      if (resp.message) {
        this.helperSvc.presentAlert(resp.message, Icon.SUCCESS);
      }
    } catch (error) {
    } finally {
      this.helperSvc.dismissLoader;
    }
  }
}

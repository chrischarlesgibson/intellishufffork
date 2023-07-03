import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from '../admin/contact/contact.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { AuthModule } from './authentication/auth.module';
import { QuestionService } from './question/question.service';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { SubjectService } from './subject/subject.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UserSettingService } from './user-setting.service';
import { QuestionModule } from './question/question.module';
import { RegistrationGuard } from './authentication/registration.guard';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent
  ],
  imports: [
    QuestionModule,
    AuthModule,
    ComponentsWithFormsModule,
    UserRoutingModule,
    RouterModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    RegistrationGuard,
    QuestionService,
    SubjectService,
    UserSettingService
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { QuestionService } from './question/question.service';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { SubjectService } from './subject/subject.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { QuestionModule } from './question/question.module';
import { AuthModule } from '../authentication/auth.module';
import { AuthGuard } from '../authentication/auth.guard';
import { EditProfileGuard } from '../authentication/edit-profile.guard';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  declarations: [],
  imports: [
    QuestionModule,
    AuthModule,
    HomeModule,
    ContactModule,
    UserRoutingModule,
    NavbarModule,
    RouterModule,
  ],
  providers: [AuthGuard, EditProfileGuard, QuestionService, SubjectService],
})
export class UserModule {}

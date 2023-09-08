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
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HoverDirective } from 'src/app/directives/hover.directive';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, ContactComponent],
  imports: [
    QuestionModule,
    AuthModule,
    ComponentsWithFormsModule,
    UserRoutingModule,
    RouterModule,
    NavbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    EditProfileGuard,
    QuestionService,
    SubjectService,
  ],
  exports: [RouterModule],
})
export class UserModule {}

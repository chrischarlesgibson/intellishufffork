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
import { HomeModule } from './home/home.module';
import { QuizModule } from './question/quiz/quiz.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    QuizModule,
    QuestionModule,
    UserRoutingModule,
    RouterModule,
    ContactModule,
    ComponentsWithFormsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    EditProfileGuard,
    QuestionService,
    SubjectService,
  ],
  // exports: [RouterModule],
})
export class UserModule {}

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AddQuestionsComponent } from './question/add-questions/add-questions.component';
import { QuestionsBankComponent } from './question/questions-bank/questions-bank.component';
import { QuizComponent } from './question/quiz/quiz.component';
import { AuthGuard } from '../authentication/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'add-questions', component: AddQuestionsComponent },
      { path: 'questions-bank', component: QuestionsBankComponent },
      { path: 'quiz', component: QuizComponent },
    ],
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

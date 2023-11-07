import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AddQuestionsComponent } from './question/add-questions/add-questions.component';
import { QuestionsBankComponent } from './question/questions-bank/questions-bank.component';
import { QuizComponent } from './question/quiz/quiz.component';
import { AuthGuard } from '../authentication/auth.guard';
import { EditProfileComponent } from '../authentication/edit-profile/edit-profile.component';
import { UserProfileResolver } from '../authentication/userprofile.resolver';

// const routes: Routes = [
//   {
//     path: 'home',
//     canActivate: [AuthGuard],
//     component: HomeComponent,
//     children: [
//       { path: 'add-questions', component: AddQuestionsComponent },
//       { path: 'questions-bank', component: QuestionsBankComponent },
//       { path: 'quiz', component: QuizComponent },
//     ],
//   },
//   {
//     path: 'contact',
//     canActivate: [AuthGuard],
//     component: ContactComponent,
//   },
// ];

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'add-questions',
        loadChildren: () =>
          import('./question/question.module').then((m) => m.QuestionModule),
      },
      {
        path: 'questions-bank',
        loadChildren: () =>
          import('./question/questions-bank/questions-bank.module').then(
            (m) => m.QuestionsBankModule,
          ),
      },
      { path: 'quiz', component: QuizComponent },
    ],
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    component: ContactComponent,
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    component: EditProfileComponent,
    resolve: {
      userData: UserProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

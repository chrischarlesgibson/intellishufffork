import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from '../admin/contact/contact.component';
import { AddQuestionsComponent } from './question/add-questions/add-questions.component';
import { QuestionsBankComponent } from './question/questions-bank/questions-bank.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RegistrationGuard } from './authentication/registration.guard';

const routes: Routes = [
    {
        path: 'home', canActivate: [AuthGuard], component: HomeComponent,
        children: [
            { path: 'contact', component: ContactComponent },
            { path: 'add-questions', component: AddQuestionsComponent },
            { path: 'questions-bank', component: QuestionsBankComponent }
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', canActivate: [RegistrationGuard], component: RegisterComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

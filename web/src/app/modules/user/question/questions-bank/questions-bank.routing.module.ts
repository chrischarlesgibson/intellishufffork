import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsBankComponent } from './questions-bank.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionsBankComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsBankRoutingModule {}

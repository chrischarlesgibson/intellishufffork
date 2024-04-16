import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
import { DatePipe } from '@angular/common';
import { QuestionService } from '../question.service';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';

@NgModule({
  declarations: [QuizComponent],
  imports: [ComponentsWithFormsModule, FontAwesomeModule, NoDataModule],
  providers: [QuestionService, DatePipe],
})
export class QuizModule {
  constructor() {}
}

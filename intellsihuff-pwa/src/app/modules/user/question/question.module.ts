import { NgModule } from '@angular/core';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { QuestionService } from './question.service';
import { DatePipe } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
import { QuestionsBankComponent } from './questions-bank/questions-bank.component';
import { QuizModule } from './quiz/quiz.module';
import { AddQuestionsModule } from './add-questions/add-questions.module';
import { QuestionsBankModule } from './questions-bank/questions-bank.module';

@NgModule({
  declarations: [],
  imports: [QuizModule, AddQuestionsModule, QuestionsBankModule],
  providers: [QuestionService, DatePipe],
})
export class QuestionModule {
  constructor() {}
}

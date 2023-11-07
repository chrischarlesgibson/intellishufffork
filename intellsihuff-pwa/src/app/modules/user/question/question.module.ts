import { NgModule } from '@angular/core';
import { QuestionsBankComponent } from './questions-bank/questions-bank.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { QuestionService } from './question.service';
import { DatePipe } from '@angular/common';
import { MaxLengthDirective } from 'src/app/directives/maxLength.directive';
import { QuizComponent } from './quiz/quiz.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoDataComponent } from 'src/app/components/no-data/no-data.component';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
import { AddQuestionsModule } from './add-questions/add-questions.module';
import { QuestionsBankModule } from './questions-bank/questions-bank.module';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    AddQuestionsModule,
    QuestionsBankModule,
    ComponentsWithFormsModule,
    FontAwesomeModule,
    NoDataModule,
  ],
  providers: [QuestionService, DatePipe],
})
export class QuestionModule {
  /**
   *
   */
  constructor() {}
}

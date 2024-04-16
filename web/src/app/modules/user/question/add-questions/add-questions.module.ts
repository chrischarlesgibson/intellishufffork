import { NgModule } from '@angular/core';
import { AddQuestionsComponent } from './add-questions.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { AddQuestionRoutingModule } from './add-questions.routing.module';

@NgModule({
  declarations: [
    AddQuestionsComponent,
  ],
  imports: [
    ComponentsWithFormsModule,
    AddQuestionRoutingModule
  ]
})
export class AddQuestionsModule { }

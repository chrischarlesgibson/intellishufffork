import { NgModule } from "@angular/core";
import { QuestionsBankComponent } from "./questions-bank/questions-bank.component";
import { AddQuestionsComponent } from "./add-questions/add-questions.component";
import { ComponentsWithFormsModule } from "src/app/components/components-with-forms.module";
import { QuestionService } from "./question.service";
import { DatePipe } from "@angular/common";
import { MaxLengthDirective } from "src/app/directives/maxLength.directive";

@NgModule({
    declarations: [
        AddQuestionsComponent,
        QuestionsBankComponent,
        MaxLengthDirective
    ],
    imports: [
        ComponentsWithFormsModule
    ],
    providers: [QuestionService, DatePipe],
  })
export class QuestionModule {
    /**
     *
     */
    constructor() {
        
    }
}
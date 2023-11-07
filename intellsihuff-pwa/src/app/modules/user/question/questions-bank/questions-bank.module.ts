import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { QuestionsBankComponent } from './questions-bank.component';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
import { QuestionsBankRoutingModule } from './questions-bank.routing.module';
import { MaxLengthDirective } from 'src/app/directives/maxLength.directive';

@NgModule({
  declarations: [QuestionsBankComponent, MaxLengthDirective],
  imports: [
    ComponentsWithFormsModule,
    NoDataModule,
    QuestionsBankRoutingModule,
  ],
})
export class QuestionsBankModule {}

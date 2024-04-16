import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { RegisterRoutingModule } from './register.routing.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    ComponentsWithFormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }

import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { RouterModule } from '@angular/router';
import { ComponentsWithOutFormsModule } from 'src/app/components/components-without-forms.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    RouterModule,
    ComponentsWithOutFormsModule
  ]
})
export class HomeModule { }

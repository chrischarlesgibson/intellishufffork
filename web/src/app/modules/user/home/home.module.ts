import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';
import { RouterModule } from '@angular/router';
import { ComponentsWithOutFormsModule } from 'src/app/components/components-without-forms.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    NavbarModule,
    RouterModule,
    ComponentsWithOutFormsModule,
  ],
})
export class HomeModule {}

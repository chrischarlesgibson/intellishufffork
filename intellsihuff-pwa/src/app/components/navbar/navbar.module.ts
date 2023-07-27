import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { HoverDirective } from 'src/app/directives/hover.directive';
import { FormsModule } from '@angular/forms';
import { ComponentsWithOutFormsModule } from '../components-without-forms.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, HoverDirective],
  imports: [ComponentsWithOutFormsModule, RouterModule],
  exports: [NavbarComponent, HoverDirective],
})
export class NavbarModule {}

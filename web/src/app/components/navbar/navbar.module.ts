import { NavbarComponent } from './navbar.component';
import { ComponentsWithOutFormsModule } from '../components-without-forms.module';
import { HoverDirective } from 'src/app/directives/hover.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [NavbarComponent, HoverDirective],
  imports: [ComponentsWithOutFormsModule, RouterModule],
  exports: [NavbarComponent],
})
export class NavbarModule {
  constructor() {
    console.log('navabr');
  }
}

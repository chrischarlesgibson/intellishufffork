import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [ComponentsWithFormsModule],
})
export class ContactModule {}

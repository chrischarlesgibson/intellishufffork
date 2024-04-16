import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [ComponentsWithFormsModule],
})
export class EditProfileModule {}

import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[maxLengthDirective]',
})
export class MaxLengthDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
  ) {}

  @HostListener('input') onInput() {
    const value = parseInt(this.el.nativeElement.value, 10);
    console.log(value);

    if (value > 100) {
      if (this.ngControl) {
        const control: AbstractControl | null = this.ngControl.control;
        control?.setValue(100); // Update the formControl value to 100 if ngControl is not null
        control?.setErrors({ inputRestricted: true }); // Set a custom error on the form control
        control?.markAsTouched(); // Mark the control as touched to trigger validation and display the error message
      }
    }
  }
}

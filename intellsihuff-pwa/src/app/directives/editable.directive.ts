import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEditable]'
})
export class EditableDirective {
  private isEditable = false;

  @Output() editableComplete = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { }

  @HostBinding('style.cursor') get cursor() {
    return this.isEditable ? 'text' : 'pointer';
  }

  @HostBinding('class.editable') get classEditable() {
    return this.isEditable;
  }

  @HostListener('click') onClick() {
    this.isEditable = true;
    this.elementRef.nativeElement.contentEditable = 'true';
    this.elementRef.nativeElement.focus();
  }

  @HostListener('blur') onBlur() {
    this.isEditable = false;
    this.elementRef.nativeElement.contentEditable = 'false';
    this.editableComplete.emit(this.elementRef.nativeElement.innerText);
  }
}
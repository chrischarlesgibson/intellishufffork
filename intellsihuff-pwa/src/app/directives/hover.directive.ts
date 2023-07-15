import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HoverDirective]'
})
export class HoverDirective implements OnInit {
  @Input() hoverText: string; // Input property to receive text

  private divElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.createDivElement();
  }
  
  private createDivElement(): void {
    this.divElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.divElement, 'display', 'none');
    this.renderer.addClass(this.divElement, 'hover-div');
    this.renderer.appendChild(this.divElement, this.renderer.createText(this.hoverText));
    this.renderer.appendChild(this.elementRef.nativeElement, this.divElement);
  }
  

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.divElement, 'display', 'block');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.setStyle(this.divElement, 'display', 'none');
  }
}

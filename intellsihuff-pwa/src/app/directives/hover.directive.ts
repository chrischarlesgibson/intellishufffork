import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HoverDirective]'
})
export class HoverDirective implements OnInit {
  @Input() hoverText: string; // Input property to receive text

  private divElement: HTMLElement;
  private isHoverEnabled = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.createDivElement();
    this.checkScreenSize();

  }
  
  private createDivElement(): void {
    this.divElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.divElement, 'display', 'none');
    this.renderer.addClass(this.divElement, 'hover-div');
    this.renderer.appendChild(this.divElement, this.renderer.createText(this.hoverText));
    this.renderer.appendChild(this.elementRef.nativeElement, this.divElement);
  }
  
  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    const isMobileScreen = screenWidth <= 999; // Adjust the screen size threshold as needed

    if (isMobileScreen && this.isHoverEnabled) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.divElement);
      this.isHoverEnabled = false;
    } else if (!isMobileScreen && !this.isHoverEnabled) {
      this.renderer.appendChild(this.elementRef.nativeElement, this.divElement);
      this.isHoverEnabled = true;
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.divElement, 'display', 'block');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.setStyle(this.divElement, 'display', 'none');
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
}

import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {
  isOpen: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  toggleOpen($event) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }
  }
}

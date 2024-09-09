import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[testElementEditableBlur]',
  standalone: true,
})
export class ElementEditableBlurDirective<T extends HTMLElement> {
  private readonly nativeElement = inject<ElementRef<T>>(ElementRef).nativeElement;
  private readonly render = inject(Renderer2);

  private setReadonly(): void {
    this.render.setAttribute(this.nativeElement, 'readonly', '')
  }

  @HostListener('blur')
  onEditableElementBlur(){
    this.setReadonly()
  }
}

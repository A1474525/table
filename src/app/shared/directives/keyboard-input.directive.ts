import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[testKeyboardInput]',
  standalone: true,
})
export class KeyboardInputDirective {
  private readonly nativeElement = inject(ElementRef).nativeElement;
  private readonly render = inject(Renderer2);

  @HostListener('keyup.enter', ['$event'])
  @HostListener('keyup.escape', ['$event'])
  onEnterEscape(event: KeyboardEvent) {
    const currentReadOnly = this.nativeElement.hasAttribute('readonly');

    if (event.key === 'Escape' && !currentReadOnly) this.setReadonly()

    if (event.key === 'Enter')
      currentReadOnly
          ? this.unsetReadonly()
          : this.setReadonly()
  }
  private unsetReadonly(): void {
    this.render.removeAttribute(this.nativeElement, 'readonly')
  }

  private setReadonly(): void {
    this.render.setAttribute(this.nativeElement, 'readonly', '')
  }
}

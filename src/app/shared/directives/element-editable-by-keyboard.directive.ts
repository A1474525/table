import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

enum EditableKey {
  ESCAPE = 'Escape',
  ENTER = 'Enter'
}

@Directive({
  selector: '[testElementEditableByKeyboard]',
  standalone: true,
})
export class ElementEditableByKeyboardDirective<T extends HTMLElement>  {
  private readonly nativeElement = inject<ElementRef<T>>(ElementRef).nativeElement;
  private readonly render = inject(Renderer2);

  private unsetReadonly(): void {
    this.render.removeAttribute(this.nativeElement, 'readonly')
  }

  private setReadonly(): void {
    this.render.setAttribute(this.nativeElement, 'readonly', '')
  }

  @HostListener(`keyup.${EditableKey.ENTER}`, ['$event'])
  @HostListener(`keyup.${EditableKey.ESCAPE}`, ['$event'])
  onEditableKeyUp(event: KeyboardEvent) {
    const isReadOnly: boolean = this.nativeElement.hasAttribute('readonly');

    if (event.key === EditableKey.ESCAPE && !isReadOnly)
      this.setReadonly();

    if (event.key === EditableKey.ENTER)
      isReadOnly
        ? this.unsetReadonly()
        : this.setReadonly()
  }
}
